import React, { useState } from 'react';
import { Calendar, Trash2, Users } from 'lucide-react';
import './App.css';

function App() {
  const people = ['Dương', 'Đức 9h8p', 'Trang', 'Đông', 'Tâm', 'Tuyền', 'Huy', 'Hậu', 'Hải', 'Duck'];
  
  // Ngày bắt đầu: hôm nay (20/10/2025) - Duck đổ rác
  const [startDate] = useState(() => {
    return new Date(2025, 9, 20); // Tháng 10 (index 9), ngày 20, 2025
  });

  // Tính số ngày đã trôi qua từ ngày bắt đầu
  const getDaysSinceStart = (currentDate) => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const current = new Date(currentDate);
    current.setHours(0, 0, 0, 0);
    
    let days = 0;
    const tempDate = new Date(start);
    
    while (tempDate < current) {
      tempDate.setDate(tempDate.getDate() + 1);
      // Chỉ đếm từ thứ 2 đến thứ 7
      if (tempDate.getDay() !== 0) {
        days++;
      }
    }
    
    return days;
  };

  const generateSchedule = (weekOffset = 0) => {
    const schedule = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Tìm thứ 2 của tuần hiện tại + offset
    const currentMonday = new Date(today);
    const dayOfWeek = currentMonday.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    currentMonday.setDate(currentMonday.getDate() + diff + (weekOffset * 7));
    
    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(currentMonday);
      currentDate.setDate(currentMonday.getDate() + i);
      
      // Tính index người đổ rác dựa trên số ngày từ startDate
      const daysSinceStart = getDaysSinceStart(currentDate);
      // Duck là người thứ 10 (index 9), là người đầu tiên
      const personIndex = (9 + daysSinceStart) % people.length;
      
      schedule.push({
        date: currentDate,
        day: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][i],
        person: people[personIndex]
      });
    }
    
    return schedule;
  };

  const [currentWeek, setCurrentWeek] = useState(0);
  const schedule = generateSchedule(currentWeek);

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <Trash2 className="icon-large" />
          <h1>Lịch Đổ Rác</h1>
        </div>

        <div className="subtitle">
          <Users className="icon-small" />
          <span>Phòng 10 người</span>
        </div>

        <div className="week-nav">
          <button onClick={() => setCurrentWeek(currentWeek - 1)} className="btn">
            ← Tuần trước
          </button>
          <div className="week-range">
            <Calendar className="icon-small" />
            <span>
              {formatDate(schedule[0].date)} - {formatDate(schedule[5].date)}
            </span>
          </div>
          <button onClick={() => setCurrentWeek(currentWeek + 1)} className="btn">
            Tuần sau →
          </button>
        </div>

        <div className="schedule-list">
          {schedule.map((item, index) => (
            <div
              key={index}
              className={`schedule-item ${isToday(item.date) ? 'today' : ''}`}
            >
              <div className="schedule-left">
                <div className="day-label">{item.day}</div>
                <div className="date-label">{formatDate(item.date)}</div>
              </div>
              <div className="schedule-right">
                {isToday(item.date) && (
                  <span className="today-badge">Hôm nay</span>
                )}
                <Trash2 className="icon-small" />
                <div className="person-name">{item.person}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="member-list">
          <h3>Danh sách thành viên:</h3>
          <div className="members">
            {people.map((person, index) => (
              <span key={index} className="member-tag">
                {index + 1}. {person}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;