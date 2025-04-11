from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ...Serializer.User.notification_serializer import NotificationSerializer
from ...Models.notification_models import Notification



class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # Automatically assign the logged-in user to the notification
        serializer.save(user=self.request.user)

