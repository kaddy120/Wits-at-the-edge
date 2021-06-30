UPDATE dbo.[Links]  
SET linkURL = @linkURL, title = @title  
OUTPUT INSERTED.*
WHERE linkId = @linkId