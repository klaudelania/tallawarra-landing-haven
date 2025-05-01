
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the registration schema using Zod
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  gender: z.string().min(1, "Please select a gender"),
  age: z.coerce.number().int().min(18, "You must be at least 18 years old"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

const loginSchema = z.object({
  usernameOrEmail: z.string().min(3, "Username or email required"),
  password: z.string().min(1, "Password required")
});

type RegisterFormValues = z.infer<typeof registerSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

const SignIn = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register, isRegistered } = useAuth();
  const { toast } = useToast();

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      username: "",
      gender: "",
      age: undefined,
      password: "",
      confirmPassword: ""
    }
  });
  
  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: ""
    }
  });

  // Handle registration form submission
  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      // Check if email is already registered
      if (isRegistered(data.email)) {
        toast({
          title: "Registration Failed",
          description: "This email is already registered. Please login instead.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // If username is provided, check if it's already taken
      if (data.username && isRegistered(data.username)) {
        toast({
          title: "Registration Failed",
          description: "This username is already taken. Please choose another.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      await register({
        name: data.name,
        surname: data.surname,
        email: data.email,
        username: data.username,
        gender: data.gender,
        age: data.age,
        password: data.password
      });
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created and you are now logged in.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login form submission
  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      await login(data.usernameOrEmail, data.password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username/email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 relative">
        {/* Close Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          onClick={() => navigate("/")}
          aria-label="Close"
        >
          <X size={20} />
        </Button>

        <h1 className="text-2xl font-bold text-center mb-6">
          {isRegistering ? "Create an Account" : "Sign In"}
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {isRegistering 
            ? "Join Tallawarra Residential Subdivision"
            : "Welcome back to Tallawarra Residential Subdivision"}
        </p>
        
        {isRegistering ? (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={registerForm.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Leave blank to use your email as username
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={registerForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={registerForm.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
              
              <div className="text-center mt-4">
                <Button
                  variant="link"
                  onClick={() => setIsRegistering(false)}
                  type="button"
                >
                  Already have an account? Sign In
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="usernameOrEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe or you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="text-center mt-4">
                <Button
                  variant="link"
                  onClick={() => setIsRegistering(true)}
                  type="button"
                >
                  Need an account? Register
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
