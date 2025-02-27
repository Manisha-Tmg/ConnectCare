from django.contrib import admin
from .models import Caretaker, CustomUser, Booking

class CaretakerAdmin(admin.ModelAdmin):
    list_display = ('name','username')  
    search_fields = ('name',)
    actions = None  
    
    # Only allow adding a caretaker but disable editing or deleting
    def has_delete_permission(self, request, obj=None):
        return False  # Disable delete permission for the admin panel

    def has_change_permission(self, request, obj=None):
        return False  # Disable change/edit permission for the admin panel

    def has_add_permission(self, request):
        return True  # Allow adding caretakers

# Customize the admin for the User model
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'date_joined')
    search_fields = ('email',)

# Customize the admin for the Booking model
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'caretaker', 'booking_date', 'status')
    list_filter = ('status', 'booking_date')
    search_fields = ('user__email', 'caretaker__name')

# Register the models with the admin interface
admin.site.register(Caretaker, CaretakerAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Booking, BookingAdmin)
