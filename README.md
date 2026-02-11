deployed website preview https://ayanchougle.github.io/Solar-pannel-web/


# Solar Panel Management App

A complete Flutter application for managing solar panel systems with user authentication, real-time monitoring, panel control, and maintenance scheduling.

## Features

### 1. **User Authentication**
- Login and Registration system
- Demo account: `demo@solar.com` / `password123`
- User profile management

### 2. **Dashboard**
- Real-time solar generation monitoring
- Power consumption tracking
- Net power calculation
- Efficiency metrics
- Daily and hourly data visualization
- Interactive power generation chart

### 3. **Panel Control**
- Auto/Manual mode switching
- Azimuth angle adjustment (0-360°)
- Tilt angle adjustment (0-90°)
- Visual compass orientation display
- Real-time panel direction visualization

### 4. **Maintenance Management**
- Task scheduling with reminders
- Priority levels (High, Medium, Low)
- Task completion tracking
- Overdue task alerts
- Add custom maintenance tasks

### 5. **User Profile**
- View system information
- Panel count and location
- Settings and preferences
- Logout functionality

## Project Structure

```
lib/
├── main.dart                          # App entry point
├── models/
│   ├── user.dart                      # User model
│   ├── solar_data.dart                # Solar data model
│   ├── panel_settings.dart            # Panel settings model
│   └── maintenance_task.dart          # Maintenance task model
├── providers/
│   ├── auth_provider.dart             # Authentication state management
│   ├── solar_provider.dart            # Solar data state management
│   └── maintenance_provider.dart      # Maintenance state management
└── screens/
    ├── login_screen.dart              # Login/Registration UI
    ├── home_screen.dart               # Main navigation
    ├── dashboard_screen.dart          # Dashboard with charts
    ├── panel_control_screen.dart      # Panel angle controls
    ├── maintenance_screen.dart        # Maintenance tasks
    └── profile_screen.dart            # User profile
```

## Installation

### Prerequisites
- Flutter SDK (3.0.0 or higher)
- Dart SDK
- Android Studio / VS Code
- Android/iOS device or emulator

### Steps

1. **Clone or create the project:**
```bash
flutter create solar_panel_app
cd solar_panel_app
```

2. **Replace the files:**
   - Copy all the provided Dart files into their respective directories
   - Replace `pubspec.yaml` with the provided configuration

3. **Install dependencies:**
```bash
flutter pub get
```

4. **Run the app:**
```bash
flutter run
```

## Dependencies

```yaml
dependencies:
  flutter:
    sdk: flutter
  provider: ^6.0.5        # State management
  cupertino_icons: ^1.0.2 # iOS style icons
```

## Static Data

The app uses **static/mock data** for demonstration:

### Solar Generation Data
- 7 days of hourly data
- Simulated solar generation pattern (peak at noon)
- Realistic consumption patterns (morning and evening peaks)
- Efficiency calculations

### Demo Users
- Email: `demo@solar.com`, Password: `password123`
- Email: `john@example.com`, Password: `john123`

### Pre-configured Maintenance Tasks
- Panel Cleaning (High priority)
- Inverter Check (Medium priority)
- Wire Inspection (Medium priority)
- Performance Analysis (Low priority)

## Usage Guide

### Login
1. Launch the app
2. Use demo credentials or register a new account
3. Access the dashboard

### Monitor Solar Data
1. Navigate to Dashboard
2. View current generation, consumption, and efficiency
3. Check today's summary statistics
4. Analyze hourly power chart

### Control Panels
1. Go to Panel Control screen
2. Switch between Auto/Manual mode
3. Adjust azimuth angle (direction)
4. Adjust tilt angle
5. View visual orientation indicator

### Manage Maintenance
1. Open Maintenance screen
2. View upcoming and completed tasks
3. Check/uncheck tasks to mark completion
4. Add new custom tasks with priority and date
5. Delete tasks if needed

## Customization

### Adding Real API Integration
Replace the static data providers with API calls:

```dart
// In solar_provider.dart
Future<void> fetchRealTimeData() async {
  final response = await http.get('your-api-endpoint');
  // Parse and update state
}
```

### Adding Notifications
Use `flutter_local_notifications` package:

```yaml
dependencies:
  flutter_local_notifications: ^16.0.0
```

### Database Storage
Replace in-memory storage with SQLite:

```yaml
dependencies:
  sqflite: ^2.3.0
  path_provider: ^2.1.0
```


## Future Enhancements

- Real-time IoT integration
- Cloud data synchronization
- Advanced analytics and reporting
- Weather integration
- Cost savings calculator
- Energy storage (battery) monitoring
- Multi-location support
- Push notifications
- Historical data export
- Dark mode support
