function solve() {
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