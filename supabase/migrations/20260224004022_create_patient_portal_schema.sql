/*
  # Viscosity Orthopedics Patient Portal Schema

  ## Overview
  Complete database schema for patient portal with authentication, profiles, appointments, and medical records.

  ## New Tables
  
  ### 1. `profiles`
  User profile information extending auth.users
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text)
  - `email` (text)
  - `phone_number` (text)
  - `date_of_birth` (date)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `doctors`
  Medical staff information
  - `id` (uuid, primary key)
  - `full_name` (text)
  - `specialization` (text)
  - `qualification` (text)
  - `experience_years` (integer)
  - `image_url` (text)
  - `available_days` (text array)
  - `created_at` (timestamptz)

  ### 3. `services`
  Medical services offered
  - `id` (uuid, primary key)
  - `name` (text)
  - `description` (text)
  - `icon` (text)
  - `created_at` (timestamptz)

  ### 4. `appointments`
  Patient appointment bookings
  - `id` (uuid, primary key)
  - `patient_id` (uuid, references profiles)
  - `doctor_id` (uuid, references doctors)
  - `service_id` (uuid, references services)
  - `appointment_date` (date)
  - `appointment_time` (time)
  - `status` (text: pending, confirmed, completed, cancelled)
  - `notes` (text)
  - `created_at` (timestamptz)

  ### 5. `patient_history`
  Medical records and documents
  - `id` (uuid, primary key)
  - `patient_id` (uuid, references profiles)
  - `title` (text)
  - `description` (text)
  - `document_type` (text: xray, report, prescription, other)
  - `file_url` (text)
  - `file_name` (text)
  - `upload_date` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Patients can only access their own data
  - Public read access for doctors and services
  - Authenticated users can create appointments and upload history
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text,
  date_of_birth date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  specialization text NOT NULL,
  qualification text NOT NULL,
  experience_years integer DEFAULT 0,
  image_url text,
  available_days text[] DEFAULT ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text DEFAULT 'activity',
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  doctor_id uuid NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create patient_history table
CREATE TABLE IF NOT EXISTS patient_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  document_type text DEFAULT 'other' CHECK (document_type IN ('xray', 'report', 'prescription', 'other')),
  file_url text,
  file_name text,
  upload_date timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_history ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Doctors policies (public read)
CREATE POLICY "Anyone can view doctors"
  ON doctors FOR SELECT
  TO authenticated
  USING (true);

-- Services policies (public read)
CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

-- Appointments policies
CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can create own appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (auth.uid() = patient_id)
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can delete own appointments"
  ON appointments FOR DELETE
  TO authenticated
  USING (auth.uid() = patient_id);

-- Patient history policies
CREATE POLICY "Users can view own history"
  ON patient_history FOR SELECT
  TO authenticated
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can create own history"
  ON patient_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own history"
  ON patient_history FOR UPDATE
  TO authenticated
  USING (auth.uid() = patient_id)
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can delete own history"
  ON patient_history FOR DELETE
  TO authenticated
  USING (auth.uid() = patient_id);

-- Insert sample doctors
INSERT INTO doctors (full_name, specialization, qualification, experience_years, available_days) VALUES
  ('Dr. Sarah Johnson', 'Orthopedic Surgeon', 'MD, FAAOS', 15, ARRAY['Monday', 'Wednesday', 'Friday']),
  ('Dr. Michael Chen', 'Sports Medicine', 'MD, MS', 12, ARRAY['Tuesday', 'Thursday', 'Saturday']),
  ('Dr. Emily Rodriguez', 'Joint Replacement', 'MD, PhD', 18, ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday']),
  ('Dr. James Williams', 'Spine Specialist', 'MD, FAAOS', 20, ARRAY['Monday', 'Wednesday', 'Friday'])
ON CONFLICT DO NOTHING;

-- Insert sample services
INSERT INTO services (name, description, icon) VALUES
  ('Joint Replacement', 'Advanced joint replacement surgery for hip, knee, and shoulder', 'bone'),
  ('Sports Injury Treatment', 'Comprehensive care for sports-related injuries and rehabilitation', 'activity'),
  ('Spine Care', 'Expert treatment for back pain, herniated discs, and spinal conditions', 'move'),
  ('Arthritis Management', 'Specialized care for arthritis and joint inflammation', 'heart-pulse'),
  ('Fracture Care', 'Emergency and planned treatment for bone fractures', 'bandage'),
  ('Physical Therapy', 'Rehabilitation and physical therapy services', 'dumbbell')
ON CONFLICT DO NOTHING;

-- Create storage bucket for patient documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('patient-documents', 'patient-documents', false)
ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload own documents"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'patient-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own documents"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'patient-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own documents"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'patient-documents' AND auth.uid()::text = (storage.foldername(name))[1]);