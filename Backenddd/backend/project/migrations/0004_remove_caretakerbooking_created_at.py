# Generated by Django 5.1.5 on 2025-03-14 16:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_remove_booking_created_at_booking_booking_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='caretakerbooking',
            name='created_at',
        ),
    ]
