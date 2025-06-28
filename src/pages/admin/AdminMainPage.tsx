
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useState } from 'react';

interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

const AdminMainPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleLoginSuccess = async (credentialResponse: any) => {
    const accessToken = credentialResponse.access_token;
    setToken(accessToken);
    fetchCalendarEvents(accessToken);
  };

  const fetchCalendarEvents = async (accessToken: string) => {
    const res = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    console.log('Google Calendar API response:', data);
    setEvents(data.items || []);
  };

  return (
    <div>
      {!token ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log('Login Failed')}
          useOneTap
          scope="https://www.googleapis.com/auth/calendar.readonly"
        />
      ) : (
        <div>
          <button onClick={() => { setToken(null); googleLogout(); }}>
            로그아웃
          </button>
          <h2>📅 내 캘린더 일정</h2>
          <ul>
            {events.map(event => (
              <li key={event.id}>
                <strong>{event.summary || '(제목 없음)'}</strong><br />
                {event.start?.dateTime || event.start?.date} ~ {event.end?.dateTime || event.end?.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminMainPage;