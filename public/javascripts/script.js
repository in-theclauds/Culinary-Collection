document.addEventListener('DOMContentLoaded', () => {
console.log("I AM LINKKKEEEDDDD!!!!!")
  



  console.log('IronGenerator JS imported successfully!');

}, false);




function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

  window.onclick = function(event) {
    if (!event.target.matches('.hamburger')) {
  
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }; 
