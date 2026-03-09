// Import React hooks for state and lifecycle management
import { useState, useEffect } from 'react';
// Import custom authentication context to get the logged-in user
import { useAuth } from '../context/AuthContext';
// Import Firestore and Storage methods for reading/updating documents and uploading files
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Import configured Firestore and Storage instances
import { db, storage } from '../firebase';
// Import Ant Design components for layout, form, buttons, upload, avatar, and notifications
import { Layout, Card, Form, Input, Button, Upload, Avatar, message, Spin } from 'antd';
// Import icons from Ant Design
import { UserOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';

// Import Navbar for consistent top navigation
import Navbar from '../components/Navbar';
// Import custom hook for handling profile logic
import userProfile from '../hooks/useProfile';
// Import ProfileContent component to render the profile form and avatar
import ProfileContent from '../components/ProfileContent';

// Extract Content component from Layout for easier usage
const { Content } = Layout;

const Profile = () => {
  // Destructure all values and functions from the custom profile hook
  const {
    user,                 // Current authenticated user
    form,                 // Ant Design form instance
    loading,              // Loading state for profile fetch/update
    setLoading,           // Setter for loading state
    uploading,            // Loading state for file upload
    setUploading,         // Setter for uploading state
    profileData,          // Current user profile data from Firestore
    setProfileData,       // Setter for profileData
    fileList,             // List of uploaded files for Ant Design Upload
    setFileList,          // Setter for fileList
    handleUpload,         // Function to handle avatar/photo upload
    onFinish              // Function called when profile form is submitted
  } = userProfile();

  // Show loading spinner while fetching profile data initially
  if (loading && !profileData) {
    return (
      <Layout className="min-h-screen">
        {/* Navbar displayed at top */}
        <Navbar />
        <Content className="flex items-center justify-center">
          {/* Spinner while loading user profile */}
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  // Main profile page layout
  return (
    <Layout className="min-h-screen">
      {/* Navbar displayed at top */}
      <Navbar />

      {/* Profile form and avatar content */}
      <ProfileContent
        profileData={profileData}       // Current profile info
        fileList={fileList}             // File list for avatar upload
        handleUpload={handleUpload}     // Upload handler for new avatar
        uploading={uploading}           // Loading state for upload button
        form={form}                     // Form instance for profile fields
        onFinish={onFinish}             // Submit handler for profile updates
        user={user}                     // Authenticated user info
        loading={loading}               // Loading state for form submit
      />
    </Layout>
  );
};

// Export Profile page component for routing
export default Profile;