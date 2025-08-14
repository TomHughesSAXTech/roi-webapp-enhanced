// Authentication Status Widget for ROI Calculator
// Add this script to your index.html to show login status and logout button

(function() {
    // Create and inject the auth status widget
    function createAuthWidget() {
        // Create the widget HTML
        const authWidget = document.createElement('div');
        authWidget.id = 'saxtech-auth-status';
        authWidget.innerHTML = `
            <style>
                #saxtech-auth-status {
                    position: fixed;
                    top: 15px;
                    right: 15px;
                    background: rgba(255, 255, 255, 0.98);
                    border: 1px solid #e0e0e0;
                    border-radius: 10px;
                    padding: 12px 16px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                    font-size: 13px;
                    z-index: 9999;
                    max-width: 280px;
                    transition: all 0.3s ease;
                }
                
                #saxtech-auth-status:hover {
                    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
                }
                
                .auth-user-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .auth-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #0078d4, #005a9e);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 14px;
                }
                
                .auth-details {
                    flex-grow: 1;
                    min-width: 0;
                }
                
                .auth-name {
                    font-weight: 600;
                    margin-bottom: 2px;
                    color: #333;
                }
                
                .auth-email {
                    color: #666;
                    font-size: 11px;
                    word-break: break-all;
                }
                
                .auth-status-text {
                    color: #28a745;
                    font-size: 11px;
                    margin-bottom: 8px;
                    font-weight: 500;
                }
                
                .auth-logout-btn {
                    background: linear-gradient(135deg, #dc3545, #c82333);
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 11px;
                    margin-left: 8px;
                    transition: all 0.2s ease;
                    font-weight: 500;
                }
                
                .auth-logout-btn:hover {
                    background: linear-gradient(135deg, #c82333, #a71e2a);
                    transform: translateY(-1px);
                }
                
                .auth-loading {
                    color: #666;
                    font-style: italic;
                    text-align: center;
                    padding: 8px;
                }
            </style>
            <div class="auth-loading">🔐 Loading auth status...</div>
        `;
        
        document.body.appendChild(authWidget);
        return authWidget;
    }
    
    // Load authentication status
    async function loadAuthStatus(widget) {
        try {
            const response = await fetch('/.auth/me');
            const data = await response.json();
            
            if (data.clientPrincipal && data.clientPrincipal.userDetails) {
                const user = data.clientPrincipal;
                const userEmail = user.userDetails;
                const userName = userEmail.split('@')[0];
                const initials = userName.substring(0, 2).toUpperCase();
                
                widget.innerHTML = `
                    <div class="auth-status-text">✅ Signed in to SAXTech ROI</div>
                    <div class="auth-user-info">
                        <div class="auth-avatar">${initials}</div>
                        <div class="auth-details">
                            <div class="auth-name">${userName}</div>
                            <div class="auth-email">${userEmail}</div>
                        </div>
                        <button class="auth-logout-btn" onclick="saxtechLogout()">Sign Out</button>
                    </div>
                `;
            } else {
                widget.innerHTML = `
                    <div style="color: #dc3545; text-align: center;">
                        <div>🔒 Not authenticated</div>
                        <a href="/.auth/login/aad" style="color: #0078d4; text-decoration: none; font-weight: 500;">Sign In</a>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading auth status:', error);
            widget.innerHTML = `
                <div style="color: #dc3545; text-align: center; font-size: 11px;">
                    ⚠️ Auth status unavailable
                </div>
            `;
        }
    }
    
    // Logout function
    window.saxtechLogout = function() {
        if (confirm('Sign out of SAXTech ROI Calculator?')) {
            window.location.href = '/.auth/logout';
        }
    }
    
    // Initialize the widget when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            const widget = createAuthWidget();
            loadAuthStatus(widget);
        });
    } else {
        const widget = createAuthWidget();
        loadAuthStatus(widget);
    }
})();
