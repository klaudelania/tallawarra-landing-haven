
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
}

const ImageUploader = ({ onImageUploaded }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    try {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      
      // Complete the progress bar
      setTimeout(() => {
        setProgress(100);
        clearInterval(interval);
        
        // Provide the image URL to the parent component
        onImageUploaded(imageUrl);
        
        toast({
          title: "Image uploaded",
          description: "Your image has been added to the slideshow"
        });
        
        // Reset and close dialog
        setTimeout(() => {
          setIsUploading(false);
          setProgress(0);
          setOpen(false);
        }, 1000);
      }, 1500);
    } catch (error) {
      clearInterval(interval);
      setIsUploading(false);
      setProgress(0);
      
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <Upload size={18} />
          <span>Add Image</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            Upload an image to add to your slideshow. The image will be displayed in the rotation.
          </p>
          
          <div className="grid gap-2">
            {isUploading && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-center text-muted-foreground">
                  Uploading... {progress}%
                </p>
              </div>
            )}
            
            {!isUploading && (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md p-10 transition-colors hover:border-muted-foreground/50">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Click to upload an image
                  </span>
                  <span className="text-xs text-muted-foreground">
                    JPG, PNG, GIF up to 10MB
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploader;
