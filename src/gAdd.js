/**
 * 
 * @author hp
 * @name addGuest
 */
var self=this;
function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
qGuest.insert();
    // TODO Добавьте свой код:
}//GEN-LAST:event_buttonActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
qGuest.deleteRow();
    // TODO Добавьте свой код:
}//GEN-LAST:event_button1ActionPerformed

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed

model.save();
close();
}//GEN-LAST:event_button2ActionPerformed

function button5ActionPerformed(evt) {//GEN-FIRST:event_button5ActionPerformed
var enter = new gEntering();
enter.showModal();
}//GEN-LAST:event_button5ActionPerformed

function button4ActionPerformed(evt) {//GEN-FIRST:event_button4ActionPerformed
	model.save();
    var reservation= new gReservation();
        reservation.showModal();
}//GEN-LAST:event_button4ActionPerformed
