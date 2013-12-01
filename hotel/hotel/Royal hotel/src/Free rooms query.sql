/**
 *
 * @author михаил
 * @name Free_rooms_query
 */ 
Select ROOMS_ID, TYPENAME, PLACES
, NUMOFROOM, PRICE 
From ROOMS t1
 Inner Join ROOMTYPE t on t1.ROOMTYPE_ID = t.ROOMTYPE_ID
 Where t.ROOMTYPE = "Свободно"