from django import forms
from ..models import Caretaker
from django.contrib.auth.hashers import make_password

class CaretakerRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Caretaker
        fields = ['username', 'name', 'gender', 'address', 'phone', 'email', 'password']

    def save(self, commit=True):
        caretaker = super().save(commit=False)
        caretaker.password = make_password(self.cleaned_data['password'])
        if commit:
            caretaker.save()
        return caretaker
