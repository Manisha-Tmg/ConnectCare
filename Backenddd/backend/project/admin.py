from django.contrib import admin
from .models import Caretaker, CustomUser

# Register the models with the admin interface
admin.site.register(Caretaker)
admin.site.register(CustomUser)
