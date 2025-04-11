from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
from django.contrib.auth import get_user_model
from cloudinary.models import CloudinaryField
from django.core.validators import RegexValidator
from ..Models.user_models import CustomUser



# notification
user = get_user_model()
class Notification(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE ,related_name="Notification")
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return  f"message{self.user.email} -{self.message[:20]}"
    
