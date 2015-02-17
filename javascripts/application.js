if (! ('querySelectorAll' in document)) {
  alert("Browser is not supported!");
  window.location = "//google.com/chrome";
}

var queryString = window.location.hash.replace(/^#/, '');
var query = {};

var saveQueryToHash = function() {
  window.location.hash = encodeURIComponent(JSON.stringify(query));
};


if (queryString) {
  query = JSON.parse(decodeURIComponent(queryString));

  if (query.user_name) {
    document.querySelector('input[name=user_name]').value = decodeURIComponent(query.user_name);
  }

  if (query.other_reason) {
    document.querySelector('input[name=other_reason]').value = decodeURIComponent(query.other_reason);
  }

  if (query.reason) {
    document.querySelector('input[name=reason][value="' + query.reason + '"]').checked = true
  }

}

var saveInputValue = function(evt) {
  var target = evt.target;
  query[encodeURIComponent(target.name)] = encodeURIComponent(target.value);
  saveQueryToHash();
};

[].forEach.call(document.querySelectorAll('input'), function() {
  this.addEventListener('change', saveInputValue);
  this.addEventListener('input', saveInputValue);
});

[].forEach.call(document.querySelectorAll('input[type=radio]'), function() {
  this.addEventListener('change', function(evt) {
    var target = evt.target;

    if (target.value != "other") {
      document.querySelector('input[name=other_reason]').value = '';
    } else {
      document.querySelector('input[name=other_reason]').focus();
    }
  });
});


