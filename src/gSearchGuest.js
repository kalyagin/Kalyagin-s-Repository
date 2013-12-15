/**
 * 
 * @author hp
 * @name gSearchGuest
 */
var self= this;
function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
	self.LastName= "%%";
    self.qSearch.requery();
}//GEN-LAST:event_formWindowOpened

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
	self.LastName="%" + textField + "%";
         self.qSearch.requery();
}//GEN-LAST:event_buttonActionPerformed

function textFieldActionPerformed(evt) {//GEN-FIRST:event_textFieldActionPerformed
	// TODO Добавьте свой код:
}//GEN-LAST:event_textFieldActionPerformed
