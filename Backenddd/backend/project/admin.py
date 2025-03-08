from django.contrib import admin
from .models import Caretaker, CustomUser, Booking

# Register the models with the admin interface
admin.site.register(Caretaker)
admin.site.register(CustomUser)
# admin.site.register(Booking)
# from django.contrib import admin
# from .models import Caretaker, CustomUser, Booking

# @admin.register(Caretaker)
# class CaretakerAdmin(admin.ModelAdmin):
#     list_display = ('name', 'email', 'phone', 'experience', 'created_at')  
#     search_fields = ('name', 'email')
#     list_filter = ('experience', 'created_at')

# @admin.register(CustomUser)
# class CustomUserAdmin(admin.ModelAdmin):
#     list_display = ('username', 'email', 'is_active', 'is_staff')
#     search_fields = ('username', 'email')
#     list_filter = ('is_active', 'is_staff')

# @admin.register(Booking)
# class BookingAdmin(admin.ModelAdmin):
#     list_display = ('caretaker', 'user', 'booking_date', 'status','location','number')
#     list_filter = ('status', 'booking_date')
#     search_fields = ('caretaker__name', 'user__username')
