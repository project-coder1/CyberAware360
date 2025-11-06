// Admin Link Protection Script
// This script intercepts admin link clicks and shows a password prompt
// Add this script to all pages that have admin links

(function() {
  'use strict';
  
  const ADMIN_PASSWORD = '9175746451';
  
  // Create password modal HTML
  function createPasswordModal() {
    const modal = document.createElement('div');
    modal.id = 'adminPasswordModal';
    modal.className = 'password-modal';
    modal.innerHTML = `
      <div class="password-modal-content">
        <div class="password-modal-header">
          <h2>🔒 Admin Access Required</h2>
          <p>Please enter the admin password to continue</p>
        </div>
        <form id="adminPasswordForm">
          <div class="password-input-group">
            <label for="adminPasswordInput">Password</label>
            <input type="password" id="adminPasswordInput" placeholder="Enter admin password" required autofocus>
            <div id="adminPasswordError" class="password-error"></div>
          </div>
          <div class="password-modal-actions">
            <button type="submit" class="password-submit-btn">Enter</button>
            <button type="button" class="password-cancel-btn" onclick="closeAdminModal()">Cancel</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add CSS if not already added
    if (!document.getElementById('adminProtectionCSS')) {
      const style = document.createElement('style');
      style.id = 'adminProtectionCSS';
      style.textContent = `
        .password-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          z-index: 10000;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        .password-modal.show {
          display: flex;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .password-modal-content {
          background: #ffffff;
          border-radius: 16px;
          padding: 2.5rem;
          max-width: 450px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .password-modal-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .password-modal-header h2 {
          font-size: 1.75rem;
          color: #0f172a;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        .password-modal-header p {
          color: #64748b;
          font-size: 1rem;
        }
        .password-input-group {
          margin-bottom: 1.5rem;
        }
        .password-input-group label {
          display: block;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        .password-input-group input[type="password"] {
          width: 100%;
          padding: 0.875rem 1.125rem;
          border-radius: 8px;
          border: 2px solid #e2e8f0;
          background: #ffffff;
          color: #1e293b;
          outline: none;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-family: inherit;
        }
        .password-input-group input[type="password"]:focus {
          border-color: #0284c7;
          box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.1);
        }
        .password-error {
          color: #dc2626;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          min-height: 20px;
        }
        .password-modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }
        .password-submit-btn {
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: #ffffff;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
        }
        .password-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(2, 132, 199, 0.4);
        }
        .password-submit-btn:active {
          transform: translateY(0);
        }
        .password-cancel-btn {
          padding: 0.875rem 2rem;
          border-radius: 8px;
          background: #f1f5f9;
          color: #475569;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }
        .password-cancel-btn:hover {
          background: #e2e8f0;
          color: #1e293b;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Show password modal
  function showPasswordModal(event) {
    event.preventDefault();
    
    // Check if already authenticated
    if (sessionStorage.getItem('adminAuthenticated') === 'true') {
      window.location.href = 'admin.html';
      return;
    }
    
    // Create modal if it doesn't exist
    if (!document.getElementById('adminPasswordModal')) {
      createPasswordModal();
    }
    
    const modal = document.getElementById('adminPasswordModal');
    modal.classList.add('show');
    
    // Focus on password input
    setTimeout(() => {
      const passwordInput = document.getElementById('adminPasswordInput');
      if (passwordInput) {
        passwordInput.focus();
      }
    }, 100);
    
    // Handle form submission
    const form = document.getElementById('adminPasswordForm');
    if (form) {
      form.onsubmit = function(e) {
        e.preventDefault();
        checkPassword();
      };
    }
  }
  
  // Close modal
  window.closeAdminModal = function() {
    const modal = document.getElementById('adminPasswordModal');
    if (modal) {
      modal.classList.remove('show');
    }
  };
  
  // Check password
  function checkPassword() {
    const password = document.getElementById('adminPasswordInput').value;
    const errorDiv = document.getElementById('adminPasswordError');
    
    if (password === ADMIN_PASSWORD) {
      // Correct password
      sessionStorage.setItem('adminAuthenticated', 'true');
      closeAdminModal();
      window.location.href = 'admin.html';
    } else {
      // Wrong password
      errorDiv.textContent = '❌ Incorrect password. Please try again.';
      document.getElementById('adminPasswordInput').value = '';
      document.getElementById('adminPasswordInput').focus();
      
      // Shake animation
      const modalContent = document.querySelector('.password-modal-content');
      modalContent.style.animation = 'shake 0.5s';
      setTimeout(() => {
        modalContent.style.animation = '';
      }, 500);
    }
  }
  
  // Intercept admin link clicks
  document.addEventListener('DOMContentLoaded', function() {
    // Find all admin links
    const adminLinks = document.querySelectorAll('a[href="admin.html"]');
    
    adminLinks.forEach(link => {
      link.addEventListener('click', showPasswordModal);
    });
    
    // Also handle clicks on parent elements
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href="admin.html"]');
      if (link) {
        showPasswordModal(e);
      }
    });
  });
  
  // Handle back button - clear auth if navigating away from admin
  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      // Page was loaded from cache
      const currentPage = window.location.pathname;
      if (!currentPage.includes('admin.html')) {
        // Clear auth when not on admin page (optional - comment out if you want persistent auth)
        // sessionStorage.removeItem('adminAuthenticated');
      }
    }
  });
})();

