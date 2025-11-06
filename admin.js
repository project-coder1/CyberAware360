// Admin Dashboard JavaScript

// Sample data
const reports = [
  {id:"#2024-001", name:"Rajesh Kumar", email:"rajesh.kumar@gmail.com", type:"financial_fraud", desc:"UPI fraud - ₹15,000 stolen via fake call", date:"2024-01-15", status:"Resolved", priority:"High"},
  {id:"#2024-002", name:"Priya Sharma", email:"priya.sharma@yahoo.com", type:"phishing", desc:"Received suspicious email claiming bank account locked", date:"2024-01-16", status:"Pending", priority:"Medium"},
  {id:"#2024-003", name:"Amit Patel", email:"amit.patel@outlook.com", type:"malware", desc:"Computer infected with ransomware, files encrypted", date:"2024-01-17", status:"Investigation", priority:"High"},
  {id:"#2024-004", name:"Sneha Reddy", email:"sneha.reddy@gmail.com", type:"scam", desc:"Fake job offer scam, lost ₹25,000 in advance payment", date:"2024-01-18", status:"Pending", priority:"Medium"},
  {id:"#2024-005", name:"Vikram Singh", email:"vikram.singh@hotmail.com", type:"data_breach", desc:"Identity theft - someone opened credit card in my name", date:"2024-01-19", status:"Resolved", priority:"High"},
  {id:"#2024-006", name:"Ananya Das", email:"ananya.das@gmail.com", type:"cyberbullying", desc:"Harassed on social media platform", date:"2024-01-20", status:"Investigation", priority:"Medium"},
  {id:"#2024-007", name:"Ravi Verma", email:"ravi.verma@gmail.com", type:"phishing", desc:"Received fake Amazon order confirmation email", date:"2024-01-21", status:"Pending", priority:"Low"},
  {id:"#2024-008", name:"Kavya Nair", email:"kavya.nair@gmail.com", type:"financial_fraud", desc:"Credit card used without authorization - ₹42,000", date:"2024-01-22", status:"Investigation", priority:"High"},
  {id:"#2024-009", name:"Arjun Menon", email:"arjun.menon@gmail.com", type:"social_engineering", desc:"Beware of call pretending to be from bank asking OTP", date:"2024-01-23", status:"Pending", priority:"Medium"},
  {id:"#2024-010", name:"Meera Joshi", email:"meera.joshi@gmail.com", type:"hacking", desc:"Social media account hacked and used to send spam messages", date:"2024-01-24", status:"Resolved", priority:"High"},
  {id:"#2024-011", name:"Dev Pillai", email:"dev.pillai@gmail.com", type:"ransomware", desc:"Windows PC locked by virus demanding payment", date:"2024-01-25", status:"Pending", priority:"High"},
  {id:"#2024-012", name:"Sahil Rao", email:"sahil.rao@gmail.com", type:"scam", desc:"Investment scam - promised high returns, lost ₹50,000", date:"2024-01-26", status:"Investigation", priority:"High"},
];

// Activity logs
let activityLogs = [
  {id: 1, type: 'system', action: 'Admin logged in', timestamp: new Date().toISOString(), user: 'Admin'},
  {id: 2, type: 'report', action: 'Report #2024-001 status changed to Resolved', timestamp: new Date(Date.now() - 3600000).toISOString(), user: 'Admin'},
  {id: 3, type: 'status', action: 'Report #2024-003 assigned for investigation', timestamp: new Date(Date.now() - 7200000).toISOString(), user: 'Admin'},
];

// Selected reports for bulk actions
let selectedReports = new Set();
let currentPage = 1;
const reportsPerPage = 25;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  if (sessionStorage.getItem('adminAuthenticated') === 'true') {
    initializeDashboard();
  }
});

function initializeDashboard() {
  updateStats();
  renderDashboard();
  renderReports();
  renderAnalytics();
  renderActivityLogs();
  updateTopTypes();
  updateRecentActivity();
}

// Tab Switching
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(tabName + 'Tab').classList.add('active');
  
  // Add active class to button
  event.target.classList.add('active');
  
  // Update content based on tab
  if (tabName === 'reports') {
    renderReports();
  } else if (tabName === 'analytics') {
    renderAnalytics();
  } else if (tabName === 'activity') {
    renderActivityLogs();
  }
}

// Dashboard Functions
function updateStats() {
  const total = reports.length;
  const pending = reports.filter(r => r.status === 'Pending').length;
  const resolved = reports.filter(r => r.status === 'Resolved').length;
  const investigation = reports.filter(r => r.status === 'Investigation').length;
  
  document.getElementById('totalReports').textContent = total;
  document.getElementById('pendingReports').textContent = pending;
  document.getElementById('resolvedReports').textContent = resolved;
  document.getElementById('investigationReports').textContent = investigation;
}

function updateTopTypes() {
  const typeCounts = {};
  reports.forEach(r => {
    typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
  });
  
  const sorted = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const list = document.getElementById('topTypesList');
  list.innerHTML = sorted.map(([type, count]) => `
    <div class="type-item">
      <span class="type-name">${type.replace('_', ' ')}</span>
      <span class="type-count">${count}</span>
    </div>
  `).join('');
}

function updateRecentActivity() {
  const recent = activityLogs.slice(0, 5);
  const list = document.getElementById('recentActivityList');
  list.innerHTML = recent.map(log => `
    <div class="activity-item">
      <span class="activity-icon">${getActivityIcon(log.type)}</span>
      <div class="activity-content">
        <div class="activity-action">${log.action}</div>
        <div class="activity-time">${formatTime(log.timestamp)}</div>
      </div>
    </div>
  `).join('');
}

function getActivityIcon(type) {
  const icons = {
    'system': '⚙️',
    'report': '📋',
    'status': '🔄'
  };
  return icons[type] || '📝';
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Reports Functions
function renderReports() {
  const filtered = applyFilters();
  const paginated = paginateArray(filtered, currentPage, reportsPerPage);
  
  const tableBody = document.querySelector("#reportsTable tbody");
  tableBody.innerHTML = "";
  
  paginated.forEach((report) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="checkbox" class="report-checkbox" value="${report.id}" onchange="toggleReportSelection('${report.id}')"></td>
      <td>${report.id}</td>
      <td>${report.name}</td>
      <td>${report.email}</td>
      <td><span class="type-badge ${report.type}">${report.type.replace('_', ' ')}</span></td>
      <td class="description-cell">${truncateText(report.desc, 50)}</td>
      <td>${report.date}</td>
      <td>
        <select class="statusSelect" onchange="updateStatus('${report.id}', this.value)">
          <option value="Pending" ${report.status==="Pending"?"selected":""}>Pending</option>
          <option value="Investigation" ${report.status==="Investigation"?"selected":""}>Under Investigation</option>
          <option value="Resolved" ${report.status==="Resolved"?"selected":""}>Resolved</option>
        </select>
      </td>
      <td>
        <button class="action-btn view" onclick="viewReport('${report.id}')">View</button>
        <button class="action-btn edit" onclick="editReport('${report.id}')">Edit</button>
        <button class="action-btn delete" onclick="deleteReport('${report.id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
  
  updatePagination(filtered.length);
}

function applyFilters() {
  const query = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const type = document.getElementById("typeFilter")?.value || "";
  const status = document.getElementById("statusFilter")?.value || "";
  const dateFrom = document.getElementById("dateFrom")?.value || "";
  const dateTo = document.getElementById("dateTo")?.value || "";
  
  return reports.filter(r => {
    const matchesSearch = !query || 
      r.name.toLowerCase().includes(query) || 
      r.email.toLowerCase().includes(query) || 
      r.type.toLowerCase().includes(query) ||
      r.desc.toLowerCase().includes(query);
    
    const matchesType = !type || r.type === type;
    const matchesStatus = !status || r.status === status;
    
    let matchesDate = true;
    if (dateFrom || dateTo) {
      const reportDate = new Date(r.date);
      if (dateFrom && reportDate < new Date(dateFrom)) matchesDate = false;
      if (dateTo && reportDate > new Date(dateTo)) matchesDate = false;
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });
}

function paginateArray(array, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return array.slice(start, end);
}

function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / reportsPerPage);
  document.getElementById('currentPage').textContent = currentPage;
  document.getElementById('totalPages').textContent = totalPages || 1;
}

function changePage(direction) {
  const filtered = applyFilters();
  const totalPages = Math.ceil(filtered.length / reportsPerPage);
  
  const newPage = currentPage + direction;
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    renderReports();
  }
}

function clearFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("typeFilter").value = "";
  document.getElementById("statusFilter").value = "";
  document.getElementById("dateFrom").value = "";
  document.getElementById("dateTo").value = "";
  currentPage = 1;
  renderReports();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const statusFilter = document.getElementById("statusFilter");
  const dateFrom = document.getElementById("dateFrom");
  const dateTo = document.getElementById("dateTo");
  
  if (searchInput) searchInput.addEventListener("input", () => { currentPage = 1; renderReports(); });
  if (typeFilter) typeFilter.addEventListener("change", () => { currentPage = 1; renderReports(); });
  if (statusFilter) statusFilter.addEventListener("change", () => { currentPage = 1; renderReports(); });
  if (dateFrom) dateFrom.addEventListener("change", () => { currentPage = 1; renderReports(); });
  if (dateTo) dateTo.addEventListener("change", () => { currentPage = 1; renderReports(); });
});

// Report Actions
function updateStatus(reportId, newStatus) {
  const report = reports.find(r => r.id === reportId);
  if (report) {
    const oldStatus = report.status;
    report.status = newStatus;
    updateStats();
    logActivity('status', `Report ${reportId} status changed from ${oldStatus} to ${newStatus}`);
    renderReports();
  }
}

function viewReport(reportId) {
  const report = reports.find(r => r.id === reportId);
  if (report) {
    const modal = document.getElementById('reportModal');
    const body = document.getElementById('reportModalBody');
    
    body.innerHTML = `
      <div class="report-details">
        <div class="detail-row">
          <label>Report ID:</label>
          <span>${report.id}</span>
        </div>
        <div class="detail-row">
          <label>Name:</label>
          <span>${report.name}</span>
        </div>
        <div class="detail-row">
          <label>Email:</label>
          <span>${report.email}</span>
        </div>
        <div class="detail-row">
          <label>Type:</label>
          <span class="type-badge ${report.type}">${report.type.replace('_', ' ')}</span>
        </div>
        <div class="detail-row">
          <label>Status:</label>
          <span class="status-badge ${report.status.toLowerCase()}">${report.status}</span>
        </div>
        <div class="detail-row">
          <label>Date:</label>
          <span>${report.date}</span>
        </div>
        <div class="detail-row full">
          <label>Description:</label>
          <p>${report.desc}</p>
        </div>
      </div>
    `;
    
    modal.style.display = 'flex';
    logActivity('report', `Viewed report ${reportId}`);
  }
}

function editReport(reportId) {
  alert(`Edit functionality for ${reportId} - Feature coming soon!`);
}

function deleteReport(reportId) {
  if (confirm(`Are you sure you want to delete report ${reportId}?`)) {
    const index = reports.findIndex(r => r.id === reportId);
    if (index !== -1) {
      reports.splice(index, 1);
      updateStats();
      renderReports();
      logActivity('report', `Deleted report ${reportId}`);
    }
  }
}

function closeModal() {
  document.getElementById('reportModal').style.display = 'none';
}

// Bulk Actions
function toggleSelectAll() {
  const selectAll = document.getElementById('selectAll');
  const checkboxes = document.querySelectorAll('.report-checkbox');
  
  checkboxes.forEach(cb => {
    cb.checked = selectAll.checked;
    if (selectAll.checked) {
      selectedReports.add(cb.value);
    } else {
      selectedReports.delete(cb.value);
    }
  });
  
  updateBulkActionsBar();
}

function toggleReportSelection(reportId) {
  const checkbox = document.querySelector(`.report-checkbox[value="${reportId}"]`);
  if (checkbox.checked) {
    selectedReports.add(reportId);
  } else {
    selectedReports.delete(reportId);
  }
  updateBulkActionsBar();
}

function updateBulkActionsBar() {
  const bar = document.getElementById('bulkActionsBar');
  const count = document.getElementById('selectedCount');
  
  if (selectedReports.size > 0) {
    bar.style.display = 'flex';
    count.textContent = `${selectedReports.size} selected`;
  } else {
    bar.style.display = 'none';
  }
}

function bulkAction(action, value) {
  if (selectedReports.size === 0) {
    alert('Please select at least one report');
    return;
  }
  
  if (action === 'delete') {
    if (!confirm(`Are you sure you want to delete ${selectedReports.size} report(s)?`)) {
      return;
    }
    
    selectedReports.forEach(id => {
      const index = reports.findIndex(r => r.id === id);
      if (index !== -1) {
        reports.splice(index, 1);
        logActivity('report', `Bulk deleted report ${id}`);
      }
    });
    
    selectedReports.clear();
    updateStats();
    renderReports();
    updateBulkActionsBar();
  } else if (action === 'status') {
    selectedReports.forEach(id => {
      const report = reports.find(r => r.id === id);
      if (report) {
        report.status = value;
        logActivity('status', `Bulk changed report ${id} status to ${value}`);
      }
    });
    
    selectedReports.clear();
    updateStats();
    renderReports();
    updateBulkActionsBar();
  }
}

function showBulkActions() {
  alert('Select reports using checkboxes to perform bulk actions');
}

// Analytics
function renderAnalytics() {
  renderTypeChart();
  renderStatusChart();
  renderTimeChart();
  renderResponseStats();
}

function renderTypeChart() {
  const typeCounts = {};
  reports.forEach(r => {
    typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
  });
  
  const container = document.getElementById('typeChart');
  const max = Math.max(...Object.values(typeCounts));
  
  container.innerHTML = Object.entries(typeCounts).map(([type, count]) => {
    const percentage = (count / max) * 100;
    return `
      <div class="chart-bar-item">
        <div class="chart-label">${type.replace('_', ' ')}</div>
        <div class="chart-bar-container">
          <div class="chart-bar" style="width: ${percentage}%"></div>
          <span class="chart-value">${count}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderStatusChart() {
  const statusCounts = {
    'Pending': reports.filter(r => r.status === 'Pending').length,
    'Investigation': reports.filter(r => r.status === 'Investigation').length,
    'Resolved': reports.filter(r => r.status === 'Resolved').length
  };
  
  const container = document.getElementById('statusChart');
  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);
  
  container.innerHTML = Object.entries(statusCounts).map(([status, count]) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return `
      <div class="chart-item">
        <div class="chart-info">
          <span class="chart-label">${status}</span>
          <span class="chart-count">${count} (${percentage.toFixed(1)}%)</span>
        </div>
        <div class="chart-progress">
          <div class="chart-progress-bar ${status.toLowerCase()}" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderTimeChart() {
  const container = document.getElementById('timeChart');
  container.innerHTML = '<p class="chart-placeholder">Time series chart - Feature coming soon</p>';
}

function renderResponseStats() {
  const container = document.getElementById('responseStats');
  container.innerHTML = `
    <div class="response-stat-item">
      <div class="stat-label">Average Response Time</div>
      <div class="stat-value">24 hours</div>
    </div>
    <div class="response-stat-item">
      <div class="stat-label">Fastest Response</div>
      <div class="stat-value">2 hours</div>
    </div>
    <div class="response-stat-item">
      <div class="stat-label">Pending Response</div>
      <div class="stat-value">${reports.filter(r => r.status === 'Pending').length}</div>
    </div>
  `;
}

// Activity Logs
function renderActivityLogs() {
  const container = document.getElementById('activityLogs');
  const logs = activityLogs.slice().reverse(); // Most recent first
  
  container.innerHTML = logs.map(log => `
    <div class="activity-log-item">
      <div class="activity-log-icon">${getActivityIcon(log.type)}</div>
      <div class="activity-log-content">
        <div class="activity-log-action">${log.action}</div>
        <div class="activity-log-meta">
          <span>${log.user}</span>
          <span>•</span>
          <span>${formatTime(log.timestamp)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function logActivity(type, action) {
  const log = {
    id: activityLogs.length + 1,
    type: type,
    action: action,
    timestamp: new Date().toISOString(),
    user: 'Admin'
  };
  activityLogs.push(log);
  
  // Keep only last 100 logs
  if (activityLogs.length > 100) {
    activityLogs.shift();
  }
  
  // Update UI if on activity tab
  if (document.getElementById('activityTab').classList.contains('active')) {
    renderActivityLogs();
  }
  
  // Update recent activity on dashboard
  updateRecentActivity();
}

// Export Functions
function exportData(type) {
  let data, filename;
  
  if (type === 'reports') {
    data = JSON.stringify(reports, null, 2);
    filename = 'reports_export.json';
  } else if (type === 'activity') {
    data = JSON.stringify(activityLogs, null, 2);
    filename = 'activity_logs_export.json';
  } else if (type === 'all') {
    data = JSON.stringify({ reports, activityLogs }, null, 2);
    filename = 'all_data_export.json';
  } else {
    data = JSON.stringify({ reports, stats: getStats() }, null, 2);
    filename = 'dashboard_export.json';
  }
  
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  
  logActivity('system', `Exported ${type} data`);
}

function getStats() {
  return {
    total: reports.length,
    pending: reports.filter(r => r.status === 'Pending').length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
    investigation: reports.filter(r => r.status === 'Investigation').length
  };
}

// Utility Functions
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function refreshData() {
  updateStats();
  renderReports();
  renderAnalytics();
  updateTopTypes();
  updateRecentActivity();
  logActivity('system', 'Data refreshed');
}

// Settings Functions
function showChangePassword() {
  document.getElementById('changePasswordModal').style.display = 'flex';
}

function closeChangePasswordModal() {
  document.getElementById('changePasswordModal').style.display = 'none';
}

function changePassword(event) {
  event.preventDefault();
  const current = document.getElementById('currentPassword').value;
  const newPass = document.getElementById('newPassword').value;
  const confirm = document.getElementById('confirmPassword').value;
  
  if (current !== '9175746451') {
    alert('Current password is incorrect');
    return;
  }
  
  if (newPass !== confirm) {
    alert('New passwords do not match');
    return;
  }
  
  if (newPass.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }
  
  alert('Password change functionality - Feature coming soon!');
  closeChangePasswordModal();
}

function clearActivityLogs() {
  if (confirm('Are you sure you want to clear all activity logs? This cannot be undone.')) {
    activityLogs = [];
    renderActivityLogs();
    logActivity('system', 'Activity logs cleared');
  }
}

// Initialize dashboard when authenticated
if (sessionStorage.getItem('adminAuthenticated') === 'true') {
  setTimeout(initializeDashboard, 100);
}

