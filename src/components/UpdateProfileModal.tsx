import React, { useState, useEffect } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface UpdateProfileModalProps {
  setOpen: (open: boolean) => void;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ setOpen }) => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
        setName(user.name || '');
        setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Name and email are required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApi.updateProfile({ name, email });
      updateUser(response.user);
      toast.success("Profile updated successfully");
      setOpen(false);
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(error.response?.data?.error || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] bg-background border-border-dark text-white">
      <DialogHeader>
        <DialogTitle className="text-white">Update Profile</DialogTitle>
        <DialogDescription className="text-gray-400">
          Update your account information.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right text-sm font-medium text-gray-300">
            Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3 bg-[#262626] border-border-dark text-white placeholder:text-gray-500"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="email" className="text-right text-sm font-medium text-gray-300">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-3 bg-[#262626] border-border-dark text-white placeholder:text-gray-500"
          />
        </div>
        <DialogFooter>
            <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save changes
            </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default UpdateProfileModal;
