// deal with the popup operation panel
module.exports = class PopupNumbers{
  constructor($panel){

    this._$panel = $panel.hide().removeClass("hidden");
    this._$panel.on("click","span", e =>{
      const $span = $(e.target);
      const $cell = this._$targetCell;
      //fill in the style mark
      if($span.hasClass("mark1")){
        if($cell.hasClass("mark1")){
          $cell.removeClass("mark1");
        }else{
          $cell.removeClass("mark2")
            .addClass("mark1");
        }
      }else if($span.hasClass("mark2")){
        if($cell.hasClass("mark2")){
          $cell.removeClass("mark2");
        }else{
          $cell.removeClass("mark1")
            .addClass("mark2");
        }
      }else if($span.hasClass("empty")){
        //clear the number and mark when click on empty
        $cell.text(0).addClass("empty");
      }else{
        //fill in the numbers
        $cell.removeClass("empty").text($span.text());
      }
      this.hide();


    })
  }
  popup($cell){
    this._$targetCell = $cell;
    const {left,top} = $cell.position();
    this._$panel
    .css({
      left:left+'px',
      top:top+'px'
    })
    .show();
  }

  hide(){
    this._$panel.hide();
  }
}
