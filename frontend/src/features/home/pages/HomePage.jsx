import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import toast from "react-hot-toast";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import "../styles/HomePage.css";

const FORM_SIGNIN_INIT = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};

export default function HomePage() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: FORM_SIGNIN_INIT,
  });

  const onSubmit = async (data) => {
    try {  
      if (isRegister) {
        const { confirmPassword, ...signupData } = data;
        // sign up api
        console.log("signupData", signupData);
        toast.success("Registered succesfully");
      } else {
        const { confirmPassword, name, ...signInData } = data;
        //log in api
        console.log("signInData", signInData);
        toast.success("Logged In succesfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    reset();
  }, [isRegister]);

  return (
    <Box className="auth-page">
      {/* Decorative SVG background */}
      <svg
        className="background-art"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="orbGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b9a6ff" />
            <stop offset="100%" stopColor="#7864e9" />
          </linearGradient>

          <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c7e7ff" />
            <stop offset="100%" stopColor="#8cb5ff" />
          </linearGradient>

          <pattern
            id="dotPattern"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.3" fill="#9386cf" opacity="0.35" />
          </pattern>
        </defs>

        <rect width="1440" height="900" fill="url(#dotPattern)" />

        <circle
          cx="150"
          cy="150"
          r="240"
          fill="url(#orbGradient)"
          opacity="0.35"
        />

        <circle
          cx="1330"
          cy="780"
          r="300"
          fill="url(#blueGradient)"
          opacity="0.55"
        />

        <circle
          cx="1230"
          cy="130"
          r="115"
          fill="none"
          stroke="#a99be8"
          strokeWidth="1.5"
        />

        <circle
          cx="1230"
          cy="130"
          r="82"
          fill="none"
          stroke="#a99be8"
          strokeWidth="1"
        />

        <path
          d="M0 680 Q280 500 520 700 T1050 660 T1440 570 L1440 900 L0 900 Z"
          fill="#d8d1ff"
          opacity="0.32"
        />

        <path
          d="M0 760 Q350 610 680 770 T1440 700 L1440 900 L0 900 Z"
          fill="#b9d9ff"
          opacity="0.28"
        />
      </svg>

      {/* Brand header */}
      <Box className="brand-header">
        <Box className="brand-logo">
          <ShoppingBagOutlinedIcon />
        </Box>

        <Typography className="brand-name">
          LUMORA<span>.</span>
        </Typography>
      </Box>

      {/* Main content */}
      <Container maxWidth="sm" className="auth-container">
        <Box className="auth-card">
          <Box className="auth-heading">
            <Typography className="eyebrow">
              YOUR NEXT FAVORITE THING
            </Typography>

            <Typography variant="h4" className="auth-title">
              {isRegister ? "Create your account" : "Welcome back"}
            </Typography>

            <Typography className="auth-subtitle">
              {isRegister
                ? "Join us and discover something extraordinary."
                : "Your favorite finds are just a step away."}
            </Typography>
          </Box>

          {/* Login / Register toggle */}
          <Box className="auth-tabs">
            <Button
              className={!isRegister ? "auth-tab active" : "auth-tab"}
              onClick={() => setIsRegister(false)}
              disableRipple
            >
              Sign in
            </Button>

            <Button
              className={isRegister ? "auth-tab active" : "auth-tab"}
              onClick={() => setIsRegister(true)}
              disableRipple
            >
              Create account
            </Button>
          </Box>

          <Box
            className="auth-form"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {isRegister && (
              <Box className="field-group">
                <Typography className="field-label">Full name</Typography>

                <TextField
                  fullWidth
                  placeholder="Enter your full name"
                  className="auth-input"
                  autoComplete="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                    validate: (value) =>
                      value.trim().length > 0 || "Name cannot be empty",
                  })}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockPersonOutlinedIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Box>
            )}

            <Box className="field-group">
              <Typography className="field-label">Email address</Typography>

              <TextField
                fullWidth
                type="email"
                placeholder="you@example.com"
                className="auth-input"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>

            <Box className="field-group">
              <Box className="field-label-row">
                <Typography className="field-label">Password</Typography>

                {!isRegister && (
                  <Typography className="forgot-password">
                    Forgot password?
                  </Typography>
                )}
              </Box>

              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="auth-input"
                autoComplete={isRegister ? "new-password" : "current-password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: {
                    uppercase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password must contain an uppercase letter",
                    lowercase: (value) =>
                      /[a-z]/.test(value) ||
                      "Password must contain a lowercase letter",
                    number: (value) =>
                      /[0-9]/.test(value) || "Password must contain a number",
                  },
                })}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          edge="end"
                          size="small"
                        >
                          <VisibilityOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Box>

            {isRegister && (
              <Box className="field-group">
                <Typography className="field-label">
                  Confirm password
                </Typography>

                <TextField
                  fullWidth
                  type="password"
                  placeholder="Re-enter your password"
                  className="auth-input"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
            )}

            {!isRegister && (
              <FormControlLabel
                className="remember-option"
                control={<Checkbox size="small" />}
                label="Remember me"
              />
            )}

            <Button
              fullWidth
              variant="contained"
              className="submit-button"
              endIcon={<ArrowForwardOutlinedIcon />}
              disableElevation
              type="submit"
            >
              {isSubmitting
                ? "Please wait..."
                : isRegister
                  ? "Sign Up"
                  : "Login"}
            </Button>
          </Box>

          <Box className="auth-footer">
            <Typography>
              {isRegister ? "Already have an account?" : "New to Lumora?"}
            </Typography>

            <Button
              className="footer-link"
              onClick={() => setIsRegister((previous) => !previous)}
            >
              {isRegister ? "Sign in" : "Create an account"}
            </Button>
          </Box>

          <Typography className="terms-text">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </Box>

        <Typography className="bottom-caption">
          CURATED FOR YOUR EVERYDAY
        </Typography>
      </Container>
    </Box>
  );
}
