import React, { useState } from 'react';
import { X, CheckCircle2, ChevronDown } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  
  // Handlers for API integration later
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login API call here");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register API call here");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[440px] bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button (Optional but recommended) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-10">
          {/* Tabs Navigation */}
          <div className="flex gap-8 mb-8">
            <button 
              onClick={() => setActiveTab('login')}
              className={`pb-2 text-lg font-bold transition-all relative ${
                activeTab === 'login' ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              Log In
              {activeTab === 'login' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#7c602e] rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('signup')}
              className={`pb-2 text-lg font-bold transition-all relative ${
                activeTab === 'signup' ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              Sign Up
              {activeTab === 'signup' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#7c602e] rounded-full" />}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={activeTab === 'login' ? handleLogin : handleRegister} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="XXXXXX" 
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-[#7c602e]/10 focus:border-[#7c602e] outline-none transition-all placeholder:text-gray-300"
                />
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={20} />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="XXXXXX" 
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-[#7c602e]/10 focus:border-[#7c602e] outline-none transition-all placeholder:text-gray-300"
                />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              {activeTab === 'login' && (
                <div className="text-right mt-2">
                  <button type="button" className="text-xs font-bold text-gray-600 hover:text-[#7c602e]">Forget Password?</button>
                </div>
              )}
            </div>

            {/* Confirm Password (Only for Signup) */}
            {activeTab === 'signup' && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="XXXXXX" 
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-[#7c602e]/10 focus:border-[#7c602e] outline-none transition-all placeholder:text-gray-300"
                  />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full py-4 bg-[#7c602e] hover:bg-[#634d25] text-white rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-[0.98]"
            >
              {activeTab === 'login' ? 'Log in' : 'Sign up'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-widest font-bold text-gray-400">
              <span className="bg-white px-4">Or Continue With</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 bg-[#f3f3f3] hover:bg-[#ebebeb] text-gray-800 py-3.5 rounded-2xl font-semibold transition-colors">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-[#f3f3f3] hover:bg-[#ebebeb] text-gray-800 py-3.5 rounded-2xl font-semibold transition-colors">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" className="w-5 h-5" />
              Continue with Facebook
            </button>
          </div>

          {/* Footer Toggle */}
          <div className="mt-10 text-center">
            <p className="text-xs font-bold text-gray-400">
              {activeTab === 'login' ? "Haven't Any Account? " : "Already Have An Account? "}
              <button 
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                className="text-[#7c602e] hover:underline"
              >
                {activeTab === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;