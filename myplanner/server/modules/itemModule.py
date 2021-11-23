from models.itemModel import BooleanEnum, ItemTypeEnum



def not_valid_complete_state(self, is_complete):
    """
    Using Boolean Enum for TRUE and FALSE strings as the actual boolean data type is not parsed
    well between python and JSON. A true value in JSON when parsed into python is not read as 
    true it's read as a string and vice versa.
    """

    if (is_complete is None):  
        return True
    elif (is_complete != BooleanEnum.true.value and is_complete != BooleanEnum.false.value):
        return True
    else:
        return False



def verify_item_type_and_completion_state(item_to_verify):

    

    if item_to_verify['item_type'] == ItemTypeEnum.note.value:
        is_complete = None, 

    elif item_to_verify['item_type'] == ItemTypeEnum.task.value:
        is_complete = item_to_verify.get('is_complete', None)

        if not_valid_complete_state(is_complete):
            return is_complete, {'error': 'Tasks should have a valid completion state: TRUE or FALSE'}, 422

    else:
        return {'error' : 'Item type incorrect'} , 422

    return is_complete, error_to_respond_with