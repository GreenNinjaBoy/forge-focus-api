# Generated by Django 3.2.24 on 2024-06-25 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goals', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usergoals',
            name='achieve_by',
            field=models.DateField(blank=True, null=True),
        ),
    ]