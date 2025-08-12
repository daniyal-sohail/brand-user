"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  Mail,
  User,
  Shield,
  Calendar,
  Bookmark,
  Download,
  CheckCircle,
  XCircle,
  Edit,
  Save,
  X,
  Camera,
} from "lucide-react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data.data);
        } else {
          setError("Failed to fetch profile");
        }
      } catch (err) {
        setError("Error loading profile");
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEditClick = () => {
    setEditForm({ name: profile?.name || "" });
    setSelectedImage(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({ name: "" });
    setSelectedImage(null);
  };

  const handleSaveProfile = async () => {
    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("name", editForm.name);

      // Add image if selected
      if (selectedImage) {
        formData.append("profileImage", selectedImage);
      }

      const response = await fetch("http://localhost:5000/api/user/me", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setProfile(result.data);
        setUser(result.data); // Update auth context
        setIsEditing(false);
        setSelectedImage(null);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Error updating profile");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  if (loading) {
    return (
      <div className="container-width fade-in min-h-screen">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-warm-brown mx-auto mb-4"></div>
            <p className="text-brand-warm-brown">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-width fade-in min-h-screen">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Error Loading Profile
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-brand-warm-brown text-brand-cream px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-width fade-in min-h-screen px-2 sm:px-4 lg:px-0">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-charcoal mb-2">Profile</h1>
        <p className="text-brand-warm-brown text-sm sm:text-base">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white border border-brand-light-beige rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-brand-charcoal flex items-center">
                <User className="w-5 h-5 mr-2 text-brand-warm-brown" />
                Basic Information
              </h2>
              {!isEditing ? (
                <button
                  onClick={handleEditClick}
                  className="flex items-center text-brand-warm-brown hover:text-brand-charcoal transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={uploadingImage}
                    className="flex items-center text-green-600 hover:text-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingImage ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-1"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center text-red-600 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-brand-warm-brown" />
                <div>
                  <p className="text-sm text-brand-warm-brown">Email</p>
                  <p className="font-semibold text-brand-charcoal">
                    {profile?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <User className="w-4 h-4 mr-3 text-brand-warm-brown" />
                <div className="flex-1">
                  <p className="text-sm text-brand-warm-brown">Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-brand-light-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-warm-brown"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <p className="font-semibold text-brand-charcoal">
                      {profile?.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-3 text-brand-warm-brown" />
                <div>
                  <p className="text-sm text-brand-warm-brown">Role</p>
                  <p className="font-semibold text-brand-charcoal">
                    {profile?.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-3 text-brand-warm-brown" />
                <div>
                  <p className="text-sm text-brand-warm-brown">Member Since</p>
                  <p className="font-semibold text-brand-charcoal">
                    {formatDate(profile?.createdAt)}
                  </p>
                </div>
              </div>

              {/* Profile Image Upload */}
              <div className="flex items-center">
                <Camera className="w-4 h-4 mr-3 text-brand-warm-brown" />
                <div className="flex-1">
                  <p className="text-sm text-brand-warm-brown">Profile Image</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center overflow-hidden">
                      {isEditing && selectedImage ? (
                        <Image
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected profile"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-brand-charcoal">
                          {profile?.name ? profile.name[0].toUpperCase() : "U"}
                        </span>
                      )}
                    </div>
                    {isEditing ? (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                        <span className="text-sm text-brand-warm-brown hover:text-brand-charcoal transition-colors">
                          {selectedImage ? "Change photo" : "Select photo"}
                        </span>
                      </label>
                    ) : (
                      <span className="text-sm text-brand-warm-brown">
                        Profile image
                      </span>
                    )}
                    {isEditing && selectedImage && (
                      <span className="text-xs text-green-600">✓ Selected</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white border border-brand-light-beige rounded-xl p-6">
            <h2 className="text-xl font-semibold text-brand-charcoal mb-4">
              Account Status
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-brand-soft-beige rounded-lg">
                <span className="text-brand-charcoal">Email Verification</span>
                {profile?.isVerified ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-brand-soft-beige rounded-lg">
                <span className="text-brand-charcoal">Canva Connected</span>
                {profile?.canvaConnected ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Activity Stats */}
          <div className="bg-white border border-brand-light-beige rounded-xl p-6">
            <h2 className="text-xl font-semibold text-brand-charcoal mb-4">
              Activity
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bookmark className="w-4 h-4 mr-2 text-brand-warm-brown" />
                  <span className="text-brand-charcoal">Bookmarks</span>
                </div>
                <span className="font-semibold text-brand-warm-brown">
                  {profile?.templateBookmarks?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-2 text-brand-warm-brown" />
                  <span className="text-brand-charcoal">Downloads</span>
                </div>
                <span className="font-semibold text-brand-warm-brown">
                  {profile?.downloads?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-brand-warm-brown" />
                  <span className="text-brand-charcoal">History</span>
                </div>
                <span className="font-semibold text-brand-warm-brown">
                  {profile?.templateHistory?.length || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Bookmarks */}
          {profile?.templateBookmarks &&
            profile.templateBookmarks.length > 0 && (
              <div className="bg-white border border-brand-light-beige rounded-xl p-6">
                <h2 className="text-xl font-semibold text-brand-charcoal mb-4">
                  Recent Bookmarks
                </h2>

                <div className="space-y-3">
                  {profile.templateBookmarks.slice(0, 3).map((bookmark) => (
                    <div
                      key={bookmark._id}
                      className="flex items-center justify-between p-2 bg-brand-soft-beige rounded"
                    >
                      <span className="text-sm text-brand-charcoal truncate">
                        Template {bookmark.templateId.slice(-6)}
                      </span>
                      <span className="text-xs text-brand-warm-brown">
                        {formatDate(bookmark.bookmarkedAt)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
