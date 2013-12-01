/**
 * @name PeriodSelector
 */

var self = this;


/** @const */
var 
PERIOD_IS_SET = "Установлен период: ",
PERIOD_IS_NOT_SET = "Период не установлен";

var datesUtils = Modules.get("DatesUtils");

/** Формирует строку с выбранным периодом для отображения на форме
 */
function setPeriodText()
{
    var lBegDateText = datesUtils.dateTimeToString(self.parBegDate);
    var lEndDateText = datesUtils.dateTimeToString(self.parEndDate);
    if (!lBegDateText && !lEndDateText)
        self.lblPeriod.text = PERIOD_IS_NOT_SET;
    else {
        if (!lBegDateText)
            lBegDateText = "...";
        if (!lEndDateText)
            lEndDateText = "...";
        self.lblPeriod.text = PERIOD_IS_SET + lBegDateText + " - " + lEndDateText;
    }
}

/** Устанавливает доступность некоторых компонентов панели "начальных дат" 
 * (левая панель на вкладке "Интервал") в зависимости от того, какая радиокнопка нажата
 * @param {Object} aRadioButton Выбранная радиокнопка, влияющая на доступность других компонентов
 */
function setBDGroupControlsEnabled(aRadioButton)
{
    switch (aRadioButton) {
        case self.rbBD_daysBeforeTA:
            self.edBD_daysBeforeTA.editable = true;
            self.edBD_anyDate.editable = false;
            break;
        case self.rbBD_anyDate:
            self.edBD_daysBeforeTA.editable = false;
            self.edBD_anyDate.editable = true;
            break;
        default :
            self.edBD_daysBeforeTA.editable = false;
            self.edBD_anyDate.editable = false;
    }
}

/** Устанавливает доступность некоторых компонентов панели "конечных дат" 
 * (правая панель на вкладке "Интервал") в зависимости от того, какая радиокнопка нажата
 * @param {Object} aRadioButton Выбранная радиокнопка, влияющая на доступность других компонентов
 */
function setEDGroupControlsEnabled(aRadioButton)
{
    switch (aRadioButton) {
        case self.rbED_daysAfterTA:
            self.edED_daysAfterTA.editable = true;
            self.edED_anyDate.editable = false;
            break;
        case self.rbED_anyDate:
            self.edED_daysAfterTA.editable = false;
            self.edED_anyDate.editable = true;
            break;
        default :
            self.edED_daysAfterTA.editable = false;
            self.edED_anyDate.editable = false;
    }
}

/** Вызывает соответствующую функцию установки "рабочего" (т.е. актуального) период в зависимости от того,
 *  какая радиокнопка выбрана на вкладке "Период"
 */
function setWorkPeriod(){
    if (self.rbYear.selected)
        setWorkYear();
    else if (self.rbMonth.selected)
        setWorkMonth();
    else if (self.rbDay.selected)
        setWorkDay();
}

/** Устанавливает доступность компонентов для редактирования года, месяца и дня
 *   на вкладке "Период".
 */
function setWorkPeriodControlsEnabled()
{
    self.edYear.editable = self.rbYear.selected && !isWorkPeriod();
    self.edMonth.editable = self.rbMonth.selected && !isWorkPeriod();
    self.edDay.editable = self.rbDay.selected && !isWorkPeriod();
}

/**
 * Возвращает выбранный период в виде объекта со свойствами
 * @return {Object} Объект со свойствами <code>begdate</code> - начало выбранного периода
 *  и <code>enddate</code> - конец выбранного периода
 */
function getPeriod() {
    return {
        begdate: self.parBegDate,
        enddate: self.parEndDate
    };
}

/** Определяет, установлен ли флажок "Рабочий период"
 * @return {Boolean} <code>true</code>, если установлен флажок "Рабочий период", иначе - <code>false</code>. 
 */
function isWorkPeriod()
{
    return self.parIsWorkPeriod && self.parIsWorkPeriod > 0;
}

/** Устанавливает границы периода.
 * @param {Date} aBegDate Начало периода.
 * @param {Date} aEndDate Конец периода.
 */
function setPeriodBounds(aBegDate, aEndDate)
{
    self.parBegDate = aBegDate;
    self.parEndDate = aEndDate;
}

/** Очищает период, устанавливая значения его границ в <code>null</code>
 */
function nullifyPeriodBounds()
{
    setPeriodBounds(null, null);
}

/** Устанавливает значение параметра "Год" в начало текущего года
 */
function setWorkYear()
{
    self.parYear = datesUtils.beginOfYear(self.parTA);
}

/** Настраивает границы выбранного периода на основе значения параметра "Год"
 */
function setPeriodBoundsByYear()
{
    if (self.parYear)
        setPeriodBounds(datesUtils.beginOfYear(self.parYear), datesUtils.endOfYear(self.parYear));
    else
        nullifyPeriodBounds();
}

/** Устанавливает значение параметра "Месяц" в начало текущего года
 */
function setWorkMonth()
{
    self.parMonth = datesUtils.beginOfMonth(self.parTA);
}

/** Настраивает границы выбранного периода на основе значения параметра "Месяц"
 */
function setPeriodBoundsByMonth()
{
    if (self.parMonth)
        setPeriodBounds(datesUtils.beginOfMonth(self.parMonth), datesUtils.endOfMonth(self.parMonth));
    else
        nullifyPeriodBounds();
}

/** Устанавливает значение параметра "День" в начало текущего года
 */
function setWorkDay()
{
    self.parDay = datesUtils.beginOfDay(self.parTA);
}

/** Настраивает границы выбранного периода на основе значения параметра "День"
 */
function setPeriodBoundsByDay()
{
    if (self.parDay)
        setPeriodBounds(datesUtils.beginOfDay(self.parDay), datesUtils.endOfDay(self.parDay));
    else
        nullifyPeriodBounds();
}

/** Устанавливает доступность компонентов на вкладке "Период"
 * @param {Object} aRadioButton 
 * @param {type} aRadioButton
 */
function setPeriodControlsEnabled(aRadioButton)
{
    var lIsAnyPeriod = aRadioButton === self.rbAnyPeriod;
    self.chkIsWorkPeriod.enabled = !lIsAnyPeriod;
    self.edAnyBegDay.editable = lIsAnyPeriod;
    self.edAnyEndDay.editable = lIsAnyPeriod;
    setWorkPeriodControlsEnabled();
}

function btnCloseActionPerformed(evt) {//GEN-FIRST:event_btnCloseActionPerformed
    self.close();
}//GEN-LAST:event_btnCloseActionPerformed

function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
    self.close(getPeriod());
}//GEN-LAST:event_btnSelectActionPerformed

function rbBD_NoValueActionPerformed(evt) {//GEN-FIRST:event_rbBD_NoValueActionPerformed
    setBDGroupControlsEnabled();
    self.parBegDate = null;
}//GEN-LAST:event_rbBD_NoValueActionPerformed

function rbBD_daysBeforeTAActionPerformed(evt) {//GEN-FIRST:event_rbBD_daysBeforeTAActionPerformed
    setBDGroupControlsEnabled(self.rbBD_daysBeforeTA);
    self.parBegDate = datesUtils.incDay(self.parTA, (-1) * self.parDaysBeforeTA);
}//GEN-LAST:event_rbBD_daysBeforeTAActionPerformed

function rbBD_beginOfYearActionPerformed(evt) {//GEN-FIRST:event_rbBD_beginOfYearActionPerformed
    setBDGroupControlsEnabled(self.rbBD_beginOfYear);
    self.parBegDate = datesUtils.beginOfYear(self.parTA);
}//GEN-LAST:event_rbBD_beginOfYearActionPerformed

function rbBD_beginOfQuartActionPerformed(evt) {//GEN-FIRST:event_rbBD_beginOfQuartActionPerformed
    setBDGroupControlsEnabled(self.rbBD_beginOfQuart);
    self.parBegDate = datesUtils.beginOfQuart(self.parTA);
}//GEN-LAST:event_rbBD_beginOfQuartActionPerformed

function rbBD_beginOfMonthActionPerformed(evt) {//GEN-FIRST:event_rbBD_beginOfMonthActionPerformed
    setBDGroupControlsEnabled(self.rbBD_beginOfMonth);
    self.parBegDate = datesUtils.beginOfMonth(self.parTA);
}//GEN-LAST:event_rbBD_beginOfMonthActionPerformed

function rbBD_beginOfWeekActionPerformed(evt) {//GEN-FIRST:event_rbBD_beginOfWeekActionPerformed
    setBDGroupControlsEnabled(self.rbBD_beginOfWeek);
    self.parBegDate = datesUtils.beginOfWeek(self.parTA);
}//GEN-LAST:event_rbBD_beginOfWeekActionPerformed

function rbBD_beginOfDayActionPerformed(evt) {//GEN-FIRST:event_rbBD_beginOfDayActionPerformed
    setBDGroupControlsEnabled(self.rbBD_beginOfDay);
    self.parBegDate = datesUtils.beginOfDay(self.parTA);
}//GEN-LAST:event_rbBD_beginOfDayActionPerformed

function rbBD_anyDateActionPerformed(evt) {//GEN-FIRST:event_rbBD_anyDateActionPerformed
    setBDGroupControlsEnabled(self.rbBD_anyDate);
}//GEN-LAST:event_rbBD_anyDateActionPerformed

function rbED_NoValueActionPerformed(evt) {//GEN-FIRST:event_rbED_NoValueActionPerformed
    setEDGroupControlsEnabled();
    self.parEndDate = null;
}//GEN-LAST:event_rbED_NoValueActionPerformed

function rbED_daysAfterTAActionPerformed(evt) {//GEN-FIRST:event_rbED_daysAfterTAActionPerformed
    setEDGroupControlsEnabled(self.rbED_daysAfterTA);
    self.parEndDate = datesUtils.incDay(self.parTA, self.parDaysAfterTA);
}//GEN-LAST:event_rbED_daysAfterTAActionPerformed

function rbED_endOfYearActionPerformed(evt) {//GEN-FIRST:event_rbED_endOfYearActionPerformed
    setEDGroupControlsEnabled(self.rbED_endOfYear);
    self.parEndDate = datesUtils.endOfYear(self.parTA);
}//GEN-LAST:event_rbED_endOfYearActionPerformed

function rbED_endOfQuartActionPerformed(evt) {//GEN-FIRST:event_rbED_endOfQuartActionPerformed
    setEDGroupControlsEnabled(self.rbED_endOfQuart);
    self.parEndDate = datesUtils.endOfQuart(self.parTA);
}//GEN-LAST:event_rbED_endOfQuartActionPerformed

function rbED_endOfMonthActionPerformed(evt) {//GEN-FIRST:event_rbED_endOfMonthActionPerformed
    setEDGroupControlsEnabled(self.rbED_endOfMonth);
    self.parEndDate = datesUtils.endOfMonth(self.parTA);
}//GEN-LAST:event_rbED_endOfMonthActionPerformed

function rbED_endOfWeekActionPerformed(evt) {//GEN-FIRST:event_rbED_endOfWeekActionPerformed
    setEDGroupControlsEnabled(self.rbED_endOfWeek);
    self.parEndDate = datesUtils.endOfWeek(self.parTA);
}//GEN-LAST:event_rbED_endOfWeekActionPerformed

function rbED_endOfDayActionPerformed(evt) {//GEN-FIRST:event_rbED_endOfDayActionPerformed
    setEDGroupControlsEnabled(self.rbED_endOfDay);
    self.parEndDate = datesUtils.endOfDay(self.parTA);
}//GEN-LAST:event_rbED_endOfDayActionPerformed

function rbED_anyDateActionPerformed(evt) {//GEN-FIRST:event_rbED_anyDateActionPerformed
    setEDGroupControlsEnabled(self.rbED_anyDate);
}//GEN-LAST:event_rbED_anyDateActionPerformed

function rbYearActionPerformed(evt) {//GEN-FIRST:event_rbYearActionPerformed
    setPeriodControlsEnabled(self.rbYear);
    if (isWorkPeriod()) {
        if (!datesUtils.equal(self.parYear, datesUtils.beginOfYear(self.parTA)))
            setWorkYear();
        else
            setPeriodBounds(datesUtils.beginOfYear(self.parTA), datesUtils.endOfYear(self.parTA));
    } else
        setPeriodBoundsByYear();
}//GEN-LAST:event_rbYearActionPerformed

function rbMonthActionPerformed(evt) {//GEN-FIRST:event_rbMonthActionPerformed
    setPeriodControlsEnabled(self.rbMonth);
    if (isWorkPeriod()) {
        if (!datesUtils.equal(self.parMonth, datesUtils.beginOfMonth(self.parTA)))
            setWorkMonth();
        else
            setPeriodBounds(datesUtils.beginOfMonth(self.parTA), datesUtils.endOfMonth(self.parTA));
    } else
        setPeriodBoundsByMonth();
}//GEN-LAST:event_rbMonthActionPerformed

function rbDayActionPerformed(evt) {//GEN-FIRST:event_rbDayActionPerformed
    setPeriodControlsEnabled(self.rbDay);
    if (isWorkPeriod()) {
        if (!datesUtils.equal(self.parDay, datesUtils.beginOfDay(self.parTA)))
            setWorkDay();
        else
            setPeriodBounds(datesUtils.beginOfDay(self.parTA), datesUtils.endOfDay(self.parTA));
    } else
        setPeriodBoundsByDay();
}//GEN-LAST:event_rbDayActionPerformed

function tabStateChanged(evt) {//GEN-FIRST:event_tabStateChanged
    if (self.tab.selectedComponent === self.pnlPeriod) {
        self.rbBD_anyDate.selected = true;
        rbBD_anyDateActionPerformed();
        self.rbED_anyDate.selected = true;
        rbED_anyDateActionPerformed();
        self.rbAnyPeriod.selected = true;
        rbAnyPeriodActionPerformed();
    }
}//GEN-LAST:event_tabStateChanged

function rbAnyPeriodActionPerformed(evt) {//GEN-FIRST:event_rbAnyPeriodActionPerformed
    setPeriodControlsEnabled(self.rbAnyPeriod);
}//GEN-LAST:event_rbAnyPeriodActionPerformed

function onChanged(evt) {//GEN-FIRST:event_onChanged
    switch (evt.field) {
        case self.params.md.parDaysBeforeTA:
            if (evt.oldValue && !evt.newValue)
                self.parDaysBeforeTA = 0;
            self.parBegDate = datesUtils.incDay(self.parTA, (-1) * self.parDaysBeforeTA);
            break;
        case self.params.md.parDaysAfterTA:
            if (evt.oldValue && !evt.newValue)
                self.parDaysAfterTA = 0;
            self.parEndDate = datesUtils.incDay(self.parTA, self.parDaysAfterTA);
            break;
        case self.params.md.parBegDate:
            setPeriodText();
            break;
        case self.params.md.parEndDate:
            setPeriodText();
            break;
        case self.params.md.parIsWorkPeriod:
            setWorkPeriodControlsEnabled();
            if (isWorkPeriod())
                setWorkPeriod();
            break;
        case self.params.md.parYear:
            self.parBegDate = datesUtils.beginOfYear(self.parYear);
            self.parEndDate = datesUtils.endOfYear(self.parYear);
            break;
        case self.params.md.parMonth:
            self.parBegDate = datesUtils.beginOfMonth(self.parMonth);
            self.parEndDate = datesUtils.endOfMonth(self.parMonth);
            break;
        case self.params.md.parDay:
            self.parBegDate = datesUtils.beginOfDay(self.parDay);
            self.parEndDate = datesUtils.endOfDay(self.parDay);
            break;
        default :
            break;
    }
}//GEN-LAST:event_onChanged

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    if (!self.parTA)
        self.parTA = datesUtils.beginOfDay(datesUtils.currentDateTime());

    var selectedBdRb = !self.parBegDate ? self.rbBD_NoValue : self.rbBD_anyDate;
    selectedBdRb.selected = true;
    setBDGroupControlsEnabled(selectedBdRb);
 
    var selectedEdRb = !self.parEndDate ? self.rbED_NoValue : self.rbED_anyDate;
    selectedEdRb.selected = true;
    setEDGroupControlsEnabled(selectedEdRb);

    self.parIsWorkPeriod = 0;
    setPeriodText();
    tabStateChanged(evt);
}//GEN-LAST:event_formWindowOpened
