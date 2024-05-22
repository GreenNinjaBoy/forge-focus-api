# Generated by Django 5.0.6 on 2024-05-22 07:35

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('refine', '0002_rename_rank_refine_priority_alter_refine_owner'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserGoals',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('children', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('achieve_by', models.DateTimeField(blank=True, null=True)),
                ('goal_title', models.CharField(max_length=50)),
                ('goal_details', models.CharField(blank=True, max_length=150, null=True)),
                ('value', models.CharField(blank=True, max_length=150, null=True)),
                ('criteria', models.CharField(blank=True, max_length=150, null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='usergoals', to=settings.AUTH_USER_MODEL)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='nested_usergoals', to='goals.usergoals')),
                ('refine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='goals_for_refine', to='refine.refine')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]