/**
 * 
 * @author hp
 * @name gReservation
 */

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
qGuestVisiting.insert();
}//GEN-LAST:event_buttonActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
model.save();	
close();
}//GEN-LAST:event_button1ActionPerformed

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
qGuestVisiting.deleteRow();	
}//GEN-LAST:event_button2ActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
	qGuestVisiting.requery();        
}//GEN-LAST:event_formWindowOpened
