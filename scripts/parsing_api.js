(function(){
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text || '').replace(/[&<>\"']/g, m => map[m]);
  }

  function displayData(data) {
    let output = "<h2>Your Location Information</h2>";
    output += "<table style='width:100%;border-collapse:collapse;">";
    output += "<tr><td style='padding:8px;border-bottom:1px solid #ddd;'><strong>IP Address:</strong></td><td style='padding:8px;border-bottom:1px solid #ddd;'>" + escapeHtml(data.ip || "N/A") + "</td></tr>";
    output += "<tr><td style='padding:8px;border-bottom:1px solid #ddd;'><strong>City:</strong></td><td style='padding:8px;border-bottom:1px solid #ddd;'>" + escapeHtml(data.city || "N/A") + "</td></tr>";
    output += "<tr><td style='padding:8px;border-bottom:1px solid #ddd;'><strong>Region:</strong></td><td style='padding:8px;border-bottom:1px solid #ddd;'>" + escapeHtml(data.region || "N/A") + "</td></tr>";
    output += "<tr><td style='padding:8px;border-bottom:1px solid #ddd;'><strong>Country:</strong></td><td style='padding:8px;border-bottom:1px solid #ddd;'>" + escapeHtml(data.country_name || "N/A") + "</td></tr>";
    output += "<tr><td style='padding:8px;border-bottom:1px solid #ddd;'><strong>Latitude:</strong></td><td style='padding:8px;border-bottom:1px solid #ddd;'>" + escapeHtml(data.latitude || "N/A") + "</td></tr>";
    output += "<tr><td style='padding:8px;border-bottom:1px solid #ddd;'><strong>Longitude:</strong></td><td style='padding:8px;border-bottom:1px solid #ddd;'>" + escapeHtml(data.longitude || "N/A") + "</td></tr>";
    output += "<tr><td style='padding:8px;border-bottom:1px solid #ddd;'><strong>Timezone:</strong></td><td style='padding:8px;border-bottom:1px solid #ddd;'>" + escapeHtml(data.timezone || "N/A") + "</td></tr>";
    output += "<tr><td style='padding:8px;'><strong>ISP:</strong></td><td style='padding:8px;'>" + escapeHtml(data.org || "N/A") + "</td></tr>";
    output += "</table>";
    document.getElementById("data").innerHTML = output;
  }

  function showError() {
    document.getElementById("data").innerHTML = "<p style='color:#dc3545;'><strong>⚠️ Error:</strong> Unable to fetch IP information from all available services. This could be due to:</p>" +
      "<ul style='text-align:left;margin:12px 0;'>" +
      "<li>Ad blocker or privacy extension blocking geolocation services</li>" +
      "<li>VPN or proxy blocking API access</li>" +
      "<li>Network connectivity issue</li>" +
      "<li>Browser privacy settings restricting cross-origin requests</li>" +
      "</ul>" +
      "<p style='font-size:0.9rem;color:#666;'>Try disabling ad blockers or privacy extensions and refreshing the page.</p>";
  }

  function tryApi(url, successCallback, errorCallback) {
    fetch(url, { mode: 'cors', credentials: 'omit', cache: 'no-store' })
      .then(response => { if (!response.ok) throw new Error('API error'); return response.json(); })
      .then(data => { successCallback(data); })
      .catch(error => errorCallback());
  }

  document.addEventListener('DOMContentLoaded', function(){
    // Try primary API: ipapi.co
    tryApi(
      "https://ipapi.co/json/",
      displayData,
      function() {
        // Fallback to secondary API: ip-api.com
        tryApi(
          "https://ip-api.com/json/",
          function(data) {
            var mappedData = {
              ip: data.query,
              city: data.city,
              region: data.region,
              country_name: data.country,
              latitude: data.lat,
              longitude: data.lon,
              timezone: data.timezone,
              org: data.isp
            };
            displayData(mappedData);
          },
          function() {
            // Final fallback: ipwho.is
            tryApi(
              "https://ipwho.is/",
              function(data) {
                var mappedData = {
                  ip: data.ip,
                  city: data.city,
                  region: data.region,
                  country_name: data.country_name,
                  latitude: data.latitude,
                  longitude: data.longitude,
                  timezone: data.timezone,
                  org: data.connection ? data.connection.isp : "Unknown"
                };
                displayData(mappedData);
              },
              showError
            );
          }
        );
      }
    );
  });
})();