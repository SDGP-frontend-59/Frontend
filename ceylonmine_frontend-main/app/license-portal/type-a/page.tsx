'use client'
import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../navbar/page'
import * as THREE from 'three';
import Swal from 'sweetalert2';

interface FormData {
  exploration_license_no: string;
  applicant_name: string;
  national_id: string;
  address: string;
  nationality: string;
  employment: string;
  place_of_business: string;
  residence: string;
  company_name: string;
  country_of_incorporation: string;
  head_office_address: string;
  registered_address_in_sri_lanka: string;
  capitalization: string;
  blasting_method: string;
  depth_of_borehole: string;
  production_volume: string;
  machinery_used: string;
  underground_mining_depth: string;
  explosives_type: string;
  land_name: string;
  land_owner_name: string;
  village_name: string;
  grama_niladhari_division: string;
  divisional_secretary_division: string;
  administrative_district: string;
  nature_of_bound: string;
  minerals_to_be_mined: string;
  industrial_mining_license_no: string;
  period_of_validity: string;
  royalty_payable: string;
  // File uploads
  articles_of_association: File | null;
  annual_reports: File | null;
  licensed_boundary_survey: File | null;
  project_team_credentials: File | null;
  economic_viability_report: File | null;
  deed_copy: File | null;
  survey_plan: File | null;
  lease_agreement: File | null;
  mine_restoration_plan: File | null;
  license_fee_receipt: File | null;
}

interface FormErrors {
  [key: string]: string;
}

export default function TypeALicense() {
  const [formData, setFormData] = useState<FormData>({
    exploration_license_no: '',
    applicant_name: '',
    national_id: '',
    address: '',
    nationality: '',
    employment: '',
    place_of_business: '',
    residence: '',
    company_name: '',
    country_of_incorporation: '',
    head_office_address: '',
    registered_address_in_sri_lanka: '',
    capitalization: '',
    blasting_method: '',
    depth_of_borehole: '',
    production_volume: '',
    machinery_used: '',
    underground_mining_depth: '',
    explosives_type: '',
    land_name: '',
    land_owner_name: '',
    village_name: '',
    grama_niladhari_division: '',
    divisional_secretary_division: '',
    administrative_district: '',
    nature_of_bound: '',
    minerals_to_be_mined: '',
    industrial_mining_license_no: '',
    period_of_validity: '',
    royalty_payable: '',
    // File uploads
    articles_of_association: null,
    annual_reports: null,
    licensed_boundary_survey: null,
    project_team_credentials: null,
    economic_viability_report: null,
    deed_copy: null,
    survey_plan: null,
    lease_agreement: null,
    mine_restoration_plan: null,
    license_fee_receipt: null,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const validateField = (name: string, value: string | File | null): string => {
    if (value === null) {
      if (name.includes('_')) { // This is a file field
        return 'This document is required';
      }
      return '';
    }

    if (typeof value !== 'string') {
      return ''; // File validation is handled separately
    }

    switch (name) {
      case 'exploration_license_no':
        if (!value.trim()) return 'Exploration License Number is required';
        if (!/^[A-Z0-9-]+$/i.test(value)) return 'Please enter a valid license number (letters, numbers, and hyphens only)';
        return '';
      
      case 'industrial_mining_license_no':
        if (!value.trim()) return 'Industrial Mining License Number is required';
        if (!/^[A-Z0-9-]+$/i.test(value)) return 'Please enter a valid license number (letters, numbers, and hyphens only)';
        return '';

      case 'applicant_name':
        if (!value.trim()) return 'Applicant Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters long';
        if (!/^[a-zA-Z\s.'-]+$/.test(value)) return 'Name contains invalid characters';
        return '';

      case 'national_id':
        if (!value.trim()) return 'National ID is required';
        if (!/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(value)) return 'Please enter a valid National ID (9 digits with V/X or 12 digits)';
        return '';

      case 'address':
      case 'head_office_address':
      case 'registered_address_in_sri_lanka':
        if (!value.trim()) return 'Address is required';
        if (value.trim().length < 5) return 'Address is too short';
        return '';

      case 'nationality':
        if (!value.trim()) return 'Nationality is required';
        return '';

      case 'employment':
        if (!value.trim()) return 'Employment is required';
        return '';

      case 'place_of_business':
      case 'residence':
        if (!value.trim()) return 'This field is required';
        return '';

      case 'company_name':
        if (!value.trim()) return 'Company Name is required';
        return '';

      case 'country_of_incorporation':
        if (!value.trim()) return 'Country of Incorporation is required';
        return '';

      case 'capitalization':
        if (!value.trim()) return 'Capitalization is required';
        if (!/^\d+$/.test(value)) return 'Please enter a valid number';
        return '';

      case 'blasting_method':
        if (!value.trim()) return 'Blasting Method is required';
        return '';

      case 'depth_of_borehole':
        if (!value.trim()) return 'Depth is required';
        if (!/^\d+(\.\d+)?$/.test(value)) return 'Please enter a valid number';
        return '';

      case 'production_volume':
        if (!value.trim()) return 'Production volume is required';
        if (!/^\d+(\.\d+)?$/.test(value)) return 'Please enter a valid number';
        return '';

      case 'machinery_used':
        if (!value.trim()) return 'Machinery Used is required';
        return '';

      case 'underground_mining_depth':
        if (!value.trim()) return 'Underground Mining Depth is required';
        if (!/^\d+(\.\d+)?$/.test(value)) return 'Please enter a valid number';
        return '';

      case 'explosives_type':
        if (!value.trim()) return 'Explosives Type is required';
        return '';

      case 'land_name':
      case 'land_owner_name':
        if (!value.trim()) return 'This field is required';
        return '';

      case 'village_name':
        if (!value.trim()) return 'Village Name is required';
        return '';

      case 'grama_niladhari_division':
        if (!value.trim()) return 'Grama Niladhari Division is required';
        return '';

      case 'divisional_secretary_division':
        if (!value.trim()) return 'Divisional Secretary Division is required';
        return '';

      case 'administrative_district':
        if (!value.trim()) return 'Administrative District is required';
        return '';

      case 'nature_of_bound':
        if (!value.trim()) return 'Nature of Bond is required';
        return '';

      case 'minerals_to_be_mined':
        if (!value.trim()) return 'Minerals to be Mined is required';
        return '';

      case 'period_of_validity':
        if (!value.trim()) return 'Period of Validity is required';
        return '';

      case 'royalty_payable':
        if (!value.trim()) return 'Royalty Payable is required';
        if (!/^\d+(\.\d+)?$/.test(value)) return 'Please enter a valid number';
        return '';

      default:
        return '';
    }
  };

  const validateFile = (file: File | null, fieldName: string): string => {
    if (!file) return 'This document is required';
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return 'File size should not exceed 5MB';
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return 'Only PDF, JPEG, and PNG files are allowed';
    }

    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mark field as touched
    setTouchedFields(prev => new Set(prev).add(name));

    // Validate field and update errors
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouchedFields(prev => new Set(prev).add(name));
  };

  const handleFileChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0] ? files[0] : null;

    setFormData(prev => ({
      ...prev,
      [field]: file
    }));

    // Mark field as touched
    setTouchedFields(prev => new Set(prev).add(field));

    // Validate file
    const error = validateFile(file, field);
    setFormErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show all errors
    const allFields = new Set(Object.keys(formData));
    setTouchedFields(allFields);

    // Validate all fields before submission
    let errors: FormErrors = {};
    let hasErrors = false;

    // Validate text fields
    Object.entries(formData).forEach(([key, value]) => {
      const error = typeof value === 'string' 
        ? validateField(key, value) 
        : validateFile(value, key);
      
      if (error) {
        errors[key] = error;
        hasErrors = true;
      }
    });

    setFormErrors(errors);

    if (hasErrors) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      // Show error message
      await Swal.fire({
        title: 'Validation Error!',
        html: 'Please correct the errors highlighted in the form.<br>Scroll to see all errors.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f97316',
        background: isDarkMode ? '#1f2937' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#333333',
      });
      return;
    }

    const data = new FormData();

    // Add license type
    data.append('licenseType', 'type-a');

    // Helper function to append nested objects
    const appendNestedObject = (prefix: string, obj: any) => {
      Object.entries(obj).forEach(([key, value]) => {
        const fullKey = prefix ? `${prefix}[${key}]` : key;

        if (value instanceof File) {
          data.append(fullKey, value);
        } else if (value && typeof value === 'object') {
          appendNestedObject(fullKey, value);
        } else if (value !== null && value !== undefined) {
          data.append(fullKey, value.toString());
        }
      });
    };

    // Append all form data
    appendNestedObject('', formData);

    try {
      // Show loading state
      Swal.fire({
        title: 'Submitting Application',
        text: 'Please wait while we process your application...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await fetch('https://ceylonminebackend.up.railway.app/license/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: data,
      });

      if (response.ok) {
        // Success message
        await Swal.fire({
          title: 'Success!',
          text: 'Your license application has been submitted successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f97316',
          background: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#333333',
          iconColor: isDarkMode ? '#fbbf24' : '#f97316',
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
          }
        });
      } else {
        // Try to get error message from response
        let errorMessage = 'Failed to submit license application';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } else {
            const textError = await response.text();
            errorMessage = textError || errorMessage;
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
        }

        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        });

        // Show error message
        await Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f97316',
          background: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#333333',
          iconColor: isDarkMode ? '#ef4444' : '#dc2626',
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
          }
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      // Show network error message
      await Swal.fire({
        title: 'Network Error!',
        text: 'A network error occurred while submitting the application. Please check your connection and try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f97316',
        background: isDarkMode ? '#1f2937' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#333333',
        iconColor: isDarkMode ? '#ef4444' : '#dc2626',
        showClass: {
          popup: 'animate__animated animate__fadeInUp animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster'
        }
      });
    }
  };

  // Listen for theme change event from navbar
  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsDarkMode(customEvent.detail.isDarkMode);
    };

    window.addEventListener('themeChange', handleThemeChange);

    // Set initial theme based on local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  // Three.js Sand (Particle) Effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.004,
      color: isDarkMode ? 0xD2B48C : 0xFFD700, // Sand color
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 2;

    let mouseX = 0;
    let mouseY = 0;

    function onDocumentMouseMove(event: MouseEvent) {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    }
    document.addEventListener('mousemove', onDocumentMouseMove);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0002 + mouseY * 0.0002; // Slowed down rotation
      particlesMesh.rotation.y += 0.0002 + mouseX * 0.0002; // Slowed down rotation
      renderer.render(scene, camera);
    };
    animate();

    const updateParticleColor = () => {
      particlesMaterial.color.set(isDarkMode ? 0xD2B48C : 0xFFD700);
    };

    const themeChangeListener = () => {
      updateParticleColor();
    };
    window.addEventListener('themeChange', themeChangeListener);

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('themeChange', themeChangeListener);
      if (particlesGeometry) particlesGeometry.dispose();
      if (particlesMaterial) particlesMaterial.dispose();
      if (renderer) renderer.dispose();
    };
  }, [isDarkMode]);

  // Helper function to determine if an error should be shown
  const shouldShowError = (fieldName: string): boolean => {
    return touchedFields.has(fieldName) && !!formErrors[fieldName];
  };

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`}>
      <Navbar />
      <div className="relative z-10 min-h-screen pt-32 pb-16">
        <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            IML Type A License Application
          </h1>
          <div className={`${isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-white'} shadow-lg rounded-lg p-6`}>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Exploration License No *
                    </label>
                    <input
                      type="text"
                      name="exploration_license_no"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('exploration_license_no') ? 'border-red-500' : ''
                      }`}
                      value={formData.exploration_license_no}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('exploration_license_no') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.exploration_license_no}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Industrial Mining License No *
                    </label>
                    <input
                      type="text"
                      name="industrial_mining_license_no"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('industrial_mining_license_no') ? 'border-red-500' : ''
                      }`}
                      value={formData.industrial_mining_license_no}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('industrial_mining_license_no') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.industrial_mining_license_no}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Applicant Details */}
              <div className="space-y-4">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Applicant Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Applicant Name *
                    </label>
                    <input
                      type="text"
                      name="applicant_name"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('applicant_name') ? 'border-red-500' : ''
                      }`}
                      value={formData.applicant_name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('applicant_name') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.applicant_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      National ID *
                    </label>
                    <input
                      type="text"
                      name="national_id"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('national_id') ? 'border-red-500' : ''
                      }`}
                      value={formData.national_id}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('national_id') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.national_id}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('address') ? 'border-red-500' : ''
                      }`}
                      value={formData.address}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('address') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nationality *
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('nationality') ? 'border-red-500' : ''
                      }`}
                      value={formData.nationality}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('nationality') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.nationality}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Employment *
                    </label>
                    <input
                      type="text"
                      name="employment"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('employment') ? 'border-red-500' : ''
                      }`}
                      value={formData.employment}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('employment') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.employment}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="space-y-4">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Business Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Place of Business *
                    </label>
                    <input
                      type="text"
                      name="place_of_business"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('place_of_business') ? 'border-red-500' : ''
                      }`}
                      value={formData.place_of_business}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('place_of_business') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.place_of_business}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Residence *
                    </label>
                    <input
                      type="text"
                      name="residence"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('residence') ? 'border-red-500' : ''
                      }`}
                      value={formData.residence}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('residence') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.residence}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('company_name') ? 'border-red-500' : ''
                      }`}
                      value={formData.company_name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('company_name') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.company_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Country of Incorporation *
                    </label>
                    <input
                      type="text"
                      name="country_of_incorporation"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('country_of_incorporation') ? 'border-red-500' : ''
                      }`}
                      value={formData.country_of_incorporation}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('country_of_incorporation') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.country_of_incorporation}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Head Office Address *
                    </label>
                    <input
                      type="text"
                      name="head_office_address"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('head_office_address') ? 'border-red-500' : ''
                      }`}
                      value={formData.head_office_address}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('head_office_address') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.head_office_address}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Registered Address in Sri Lanka *
                    </label>
                    <input
                      type="text"
                      name="registered_address_in_sri_lanka"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('registered_address_in_sri_lanka') ? 'border-red-500' : ''
                      }`}
                      value={formData.registered_address_in_sri_lanka}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('registered_address_in_sri_lanka') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.registered_address_in_sri_lanka}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Capitalization *
                    </label>
                    <input
                      type="text"
                      name="capitalization"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('capitalization') ? 'border-red-500' : ''
                      }`}
                      value={formData.capitalization}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('capitalization') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.capitalization}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Mining Operation Details */}
              <div className="space-y-4">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Mining Operation Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Blasting Method *
                    </label>
                    <input
                      type="text"
                      name="blasting_method"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('blasting_method') ? 'border-red-500' : ''
                      }`}
                      value={formData.blasting_method}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('blasting_method') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.blasting_method}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Depth of Borehole *
                    </label>
                    <input
                      type="text"
                      name="depth_of_borehole"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('depth_of_borehole') ? 'border-red-500' : ''
                      }`}
                      value={formData.depth_of_borehole}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('depth_of_borehole') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.depth_of_borehole}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Production Volume *
                    </label>
                    <input
                      type="text"
                      name="production_volume"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('production_volume') ? 'border-red-500' : ''
                      }`}
                      value={formData.production_volume}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('production_volume') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.production_volume}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Machinery Used *
                    </label>
                    <input
                      type="text"
                      name="machinery_used"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('machinery_used') ? 'border-red-500' : ''
                      }`}
                      value={formData.machinery_used}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('machinery_used') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.machinery_used}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Underground Mining Depth *
                    </label>
                    <input
                      type="text"
                      name="underground_mining_depth"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('underground_mining_depth') ? 'border-red-500' : ''
                      }`}
                      value={formData.underground_mining_depth}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('underground_mining_depth') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.underground_mining_depth}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Explosives Type *
                    </label>
                    <input
                      type="text"
                      name="explosives_type"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('explosives_type') ? 'border-red-500' : ''
                      }`}
                      value={formData.explosives_type}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('explosives_type') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.explosives_type}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* License Area Details */}
              <div className="space-y-4">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  License Area Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Land Name *
                    </label>
                    <input
                      type="text"
                      name="land_name"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('land_name') ? 'border-red-500' : ''
                      }`}
                      value={formData.land_name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('land_name') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.land_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Land Owner Name *
                    </label>
                    <input
                      type="text"
                      name="land_owner_name"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('land_owner_name') ? 'border-red-500' : ''
                      }`}
                      value={formData.land_owner_name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('land_owner_name') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.land_owner_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Village Name *
                    </label>
                    <input
                      type="text"
                      name="village_name"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('village_name') ? 'border-red-500' : ''
                      }`}
                      value={formData.village_name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('village_name') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.village_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Grama Niladhari Division *
                    </label>
                    <input
                      type="text"
                      name="grama_niladhari_division"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('grama_niladhari_division') ? 'border-red-500' : ''
                      }`}
                      value={formData.grama_niladhari_division}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('grama_niladhari_division') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.grama_niladhari_division}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Divisional Secretary Division *
                    </label>
                    <input
                      type="text"
                      name="divisional_secretary_division"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('divisional_secretary_division') ? 'border-red-500' : ''
                      }`}
                      value={formData.divisional_secretary_division}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('divisional_secretary_division') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.divisional_secretary_division}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Administrative District *
                    </label>
                    <input
                      type="text"
                      name="administrative_district"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('administrative_district') ? 'border-red-500' : ''
                      }`}
                      value={formData.administrative_district}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('administrative_district') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.administrative_district}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Additional Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nature of Bond *
                    </label>
                    <input
                      type="text"
                      name="nature_of_bound"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('nature_of_bound') ? 'border-red-500' : ''
                      }`}
                      value={formData.nature_of_bound}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('nature_of_bound') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.nature_of_bound}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Minerals to be Mined *
                    </label>
                    <input
                      type="text"
                      name="minerals_to_be_mined"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('minerals_to_be_mined') ? 'border-red-500' : ''
                      }`}
                      value={formData.minerals_to_be_mined}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('minerals_to_be_mined') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.minerals_to_be_mined}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Period of Validity *
                    </label>
                    <input
                      type="text"
                      name="period_of_validity"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('period_of_validity') ? 'border-red-500' : ''
                      }`}
                      value={formData.period_of_validity}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('period_of_validity') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.period_of_validity}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Royalty Payable *
                    </label>
                    <input
                      type="text"
                      name="royalty_payable"
                      className={`mt-1 block w-full rounded-md ${
                        isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        shouldShowError('royalty_payable') ? 'border-red-500' : ''
                      }`}
                      value={formData.royalty_payable}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {shouldShowError('royalty_payable') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.royalty_payable}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Required Documents *
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Articles of Association
                    </label>
                    <input
                      type="file"
                      className={`mt-1 block w-full text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                        isDarkMode ? 'file:bg-gray-700 file:text-white' : 'file:bg-gray-200 file:text-gray-700'
                      } file:text-sm file:font-semibold ${
                        shouldShowError('articles_of_association') ? 'border border-red-500 rounded-md' : ''
                      }`}
                      onChange={handleFileChange('articles_of_association')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {shouldShowError('articles_of_association') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.articles_of_association}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Annual Reports
                    </label>
                    <input
                      type="file"
                      className={`mt-1 block w-full text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                        isDarkMode ? 'file:bg-gray-700 file:text-white' : 'file:bg-gray-200 file:text-gray-700'
                      } file:text-sm file:font-semibold ${
                        shouldShowError('annual_reports') ? 'border border-red-500 rounded-md' : ''
                      }`}
                      onChange={handleFileChange('annual_reports')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {shouldShowError('annual_reports') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.annual_reports}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Licensed Boundary Survey
                    </label>
                    <input
                      type="file"
                      className={`mt-1 block w-full text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                        isDarkMode ? 'file:bg-gray-700 file:text-white' : 'file:bg-gray-200 file:text-gray-700'
                      } file:text-sm file:font-semibold ${
                        shouldShowError('licensed_boundary_survey') ? 'border border-red-500 rounded-md' : ''
                      }`}
                      onChange={handleFileChange('licensed_boundary_survey')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {shouldShowError('licensed_boundary_survey') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.licensed_boundary_survey}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Project Team Credentials
                    </label>
                    <input
                      type="file"
                      className={`mt-1 block w-full text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                        isDarkMode ? 'file:bg-gray-700 file:text-white' : 'file:bg-gray-200 file:text-gray-700'
                      } file:text-sm file:font-semibold ${
                        shouldShowError('project_team_credentials') ? 'border border-red-500 rounded-md' : ''
                      }`}
                      onChange={handleFileChange('project_team_credentials')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {shouldShowError('project_team_credentials') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.project_team_credentials}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Economic Viability Report
                    </label>
                    <input
                      type="file"
                      className={`mt-1 block w-full text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                        isDarkMode ? 'file:bg-gray-700 file:text-white' : 'file:bg-gray-200 file:text-gray-700'
                      } file:text-sm file:font-semibold ${
                        shouldShowError('economic_viability_report') ? 'border border-red-500 rounded-md' : ''
                      }`}
                      onChange={handleFileChange('economic_viability_report')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {shouldShowError('economic_viability_report') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.economic_viability_report}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Deed Copy
                    </label>
                    <input
                      type="file"
                      className={`mt-1 block w-full text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                        isDarkMode ? 'file:bg-gray-700 file:text-white' : 'file:bg-gray-200 file:text-gray-700'
                      } file:text-sm file:font-semibold ${
                        shouldShowError('deed_copy') ? 'border border-red-500 rounded-md' : ''
                      }`}
                      onChange={handleFileChange('deed_copy')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {shouldShowError('deed_copy') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.deed_copy}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Survey Plan
                    </label>
                    <input
                      type="file"
                      className={`mt-1 block w-full text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                        isDarkMode ? 'file:bg-gray-700 file:text-white' : 'file:bg-gray-200 file:text-gray-700'
                      } file:text-sm file:font-semibold ${
                        shouldShowError('survey_plan') ? 'border border-red-500 rounded-md' : ''
                      }`}
                      onChange={handleFileChange('survey_plan')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {shouldShowError('survey_plan') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.survey_plan}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Lease Agreement
                    </label>
                    <input
                      type="file"
                      className={`mt-1 block w-full text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                        isDarkMode ? 'file:bg-gray-700 file:text-white' : 'file:bg-gray-200 file:text-gray-700'
                      } file:text-sm file:font-semibold ${
                        shouldShowError('lease_agreement') ? 'border border-red-500 rounded-md' : ''
                      }`}
                      onChange={handleFileChange('lease_agreement')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {shouldShowError('lease_agreement') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.lease_agreement}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Mine Restoration Plan
                    </label>
                    <input
                      type="file"
                      className={`mt-1 block w-full text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                        isDarkMode ? 'file:bg-gray-700 file:text-white' : 'file:bg-gray-200 file:text-gray-700'
                      } file:text-sm file:font-semibold ${
                        shouldShowError('mine_restoration_plan') ? 'border border-red-500 rounded-md' : ''
                      }`}
                      onChange={handleFileChange('mine_restoration_plan')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {shouldShowError('mine_restoration_plan') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.mine_restoration_plan}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      License Fee Receipt
                    </label>
                    <input
                      type="file"
                      className={`mt-1 block w-full text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                        isDarkMode ? 'file:bg-gray-700 file:text-white' : 'file:bg-gray-200 file:text-gray-700'
                      } file:text-sm file:font-semibold ${
                        shouldShowError('license_fee_receipt') ? 'border border-red-500 rounded-md' : ''
                      }`}
                      onChange={handleFileChange('license_fee_receipt')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {shouldShowError('license_fee_receipt') && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.license_fee_receipt}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Three.js Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />
    </div>
  );
}