$(document).ready(function(){

  /* ANIMATE CREATE TABS */
  let formMenu = document.getElementById('formMenu');
  let formProject = document.getElementById('addProject');
  let formCategory = document.getElementById('addCategory');

  $('#formMenu .nav-link').on('click', function() {

    //Find correct span from clicked link
    let indic = this;

    function animateForms(thisForm, otherForm, offset){
      //Get initial height of the form
      let height = $(thisForm).outerHeight(true);

      //Get correct ids of span in link to animate open/close icons
      let indicator = '#' + indic.id +' #'+indic.children[0].id;

      //As default close icons on click
      $('.nav-tabs .nav-item a span#indicator').addClass('close');
      $('.nav-tabs .nav-item a span#indicator').removeClass('open');

      //if this is hidden
      if ($(thisForm).hasClass('hidden'))
      {
        //Set height to 0 for animation
        $(thisForm).height(0);

        //Remove hidden
        $(thisForm).removeClass('hidden');

        //Animate to forms original height - offset (fixes bug with other form)
        $(thisForm).stop().animate({
            height: height
        }, 250, () => {
          if(!offset) $(thisForm).height('auto');

          //switch menu icon
          $(indicator).removeClass('close');
          $(indicator).addClass('open');
        });

        //If other form is not hidden
        if(!$(otherForm).hasClass('hidden'))
        {
          //Animate it to 0 height
          $(otherForm).stop().animate({
            height: 0
          }, 250, () => {
            //Reset the height to initial value
            $(otherForm).height('auto');
            //and hide it
            $(otherForm).addClass('hidden');
            //Remove hidden from this form
            $(thisForm).removeClass('hidden');

          });
          //Animate to this forms original height - offset
          $(thisForm).stop().animate({
            height: height
          }, 250, () => {
            if(!offset) $(thisForm).height('auto');

            //switch menu icon
            $(indicator).removeClass('close');
            $(indicator).addClass('open');
          });
        }
      //Else if this is not hidden, close and hide
      } else if (!$(thisForm).hasClass('hidden'))
      {
        //if clicked tab is not hidden, hide it on re-click
        $(thisForm).stop().animate({
            height: 0
        }, 500, () => {
          //This lets the animation height reset to original value after animations
          $(thisForm).height('auto');
          $(thisForm).addClass('hidden');

          //switch menu icon
          $(indicator).removeClass('open');
          $(indicator).addClass('close');
        });
      }
    }

    //Animate the clicked button
    if (this.id === 'addProj') animateForms(formProject, formCategory);
    if (this.id === 'addCat') animateForms(formCategory, formProject, true);

  });
});
