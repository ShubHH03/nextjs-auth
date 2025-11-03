"use client";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log("User data:", response.data);
      setUser({
        username: response.data.data.username,
        email: response.data.data.email,
        isAdmin: response.data.data.isAdmin || false,
      });
    } catch (error: any) {
      console.log("Error fetching user details:", error);
      toast.error("Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error: any) {
      console.log("Error during logout:", error);

      // Display specific error message from backend
      const errorMessage = error.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted/20">
      <div className="w-full max-w-2xl">
        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-sm text-muted-foreground">
                Loading your profile...
              </p>
            </div>
          ) : (
            <>
              {/* Header Section with Avatar */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 border-b border-border">
                <div className="flex items-center gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold text-foreground truncate">
                      {user.username}
                    </h1>
                    <p className="text-muted-foreground mt-1">{user.email}</p>

                    {/* Badge */}
                    <div className="mt-3">
                      {user.isAdmin ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          User
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                {/* Account Details Card */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Account Details
                  </h2>
                  <div className="space-y-3">
                    {/* Username Row */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Username
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {user.username}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Email Row */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Email Address
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Account Type Row */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Account Type
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {user.isAdmin ? "Administrator" : "Standard User"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  {/* <Button
                    variant="outline"
                    className="flex-1 cursor-pointer"
                    size="lg"
                    // onClick={() => router.push("/profile/edit")}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Profile
                  </Button> */}
                  <Button
                    onClick={logout}
                    variant="destructive"
                    className="flex-1 cursor-pointer"
                    size="lg"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>  
      </div>
    </div>
  );
}
