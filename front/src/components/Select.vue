<template>
<div class="custom-select" style="width:100px;">
    <select :v-if="content" @change="change" >
        <Option v-for="(option, index) in content"
            :key="index"
            :value="option"/>
    </select>  
    </div>
</template>

<script>



import Option from '../components/Option'

export default {
    name: "Select",
    components: {
        Option,
    },
    props: {
        content: Object
    },
    data() {
        return {
          selected : "",
        }
    },
    methods: {    
        change(event){
            this.$emit('select-change', event.target.value)
        },
        emitData(data){
          this.$emit('select-change', data)
        }
    },
    computed: {
        options(){
            return this.content
        }
        
},
async mounted() {
  console.log(this.content)
    var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  console.log(ll)
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  console.log(selElmnt.selectedIndex)
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function() {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", (e) =>{
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      if(this.selected.length != 0 && (a.lastChild.data != this.selected)) // si rien n'a encore été sélectionné ou que l'on clique sur le même élement que celui déjà sélectionné
      {
            this.emitData(a.lastChild.data) //alors on notifie le parent
      }
      this.selected = a.lastChild.data
      a.nextSibling.classList.toggle("select-hide");
      a.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);


}


}
</script>

<style>

/*the container must be positioned relative:*/
.custom-select {
  position: relative;
  font-family: Lato;
}

.custom-select select {
  display: none; /*hide original SELECT element:*/
}

.select-selected {
  background-color: rgb(34,34,34);
  }

/*style the arrow inside the select element:*/
.select-selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;

  border: 8px solid;
  border-color: #faf0cd transparent transparent transparent;
}

/*point the arrow upwards when the select box is open (active):*/
.select-selected.select-arrow-active:after {
  border-color: transparent transparent #faf0cd transparent;
  top: 7px;
}

/*style the items (options), including the selected item:*/
.select-items div,.select-selected {
  color: #faf0cd;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
  user-select: none;

}

/*style items (options):*/
.select-items {
  position: absolute;
  background-color: rgb(34,34,34);
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
  overflow: auto;
  height: 200px;
}

/*hide the items when the select box is closed:*/
.select-hide {
  display: none;
}

.select-items div:hover {
  background-color: #faf0cd;
  color:#9b2d23;
}

</style>
