function solve2() {
   const rows = Array.from(document.getElementsByTagName('tr')).slice(1);

   rows
      .forEach(r => {
         r.addEventListener('click', highlight);
      });

   function highlight() {
      //alert(this);
      if (this.hasAttribute('style')) {
         this.removeAttribute('style');
      } else {
         Array.from(this.parentElement.children)
            .forEach(r => {
               r.removeAttribute('style');
            });
         this.style.backgroundColor = '#413f5e';
      }
   }
}

function solve(){
   document.querySelector('tbody').addEventListener('click', mark);
   const rows = Array.from(document.querySelectorAll('tbody > tr'));

   function mark(e) {
      e.preventDefault();

      if (!e.target.parentElement.style.backgroundColor) {
         clear();
         e.target.parentElement.style.backgroundColor = 'rgb(65, 63, 94)';
      } else {
         clear();
      }
   }

   function clear(){
      rows.forEach(r => r.style.backgroundColor = '');
   }
}