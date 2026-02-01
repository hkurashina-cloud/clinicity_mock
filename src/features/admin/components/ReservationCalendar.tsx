import React, { useRef, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { EventInput, EventClickArg, EventDropArg } from '@fullcalendar/core';

const createWeekEvents = (): EventInput[] => {
  const now = new Date();
  const day = now.getDay(); // 0:Sun - 6:Sat
  const diffToMonday = (day + 6) % 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - diffToMonday);

  const makeDate = (offset: number, time: string) => {
    const [h, m] = time.split(':').map(Number);
    const d = new Date(monday);
    d.setDate(monday.getDate() + offset);
    d.setHours(h, m, 0, 0);
    return d;
  };

  return [
    {
      id: '1',
      title: 'ボトックス注射（初回）',
      start: makeDate(1, '11:00'),
      end: makeDate(1, '12:00'),
    },
    {
      id: '2',
      title: 'カウンセリング',
      start: makeDate(2, '14:00'),
      end: makeDate(2, '15:00'),
    },
    {
      id: '3',
      title: '美肌治療コース',
      start: makeDate(3, '16:00'),
      end: makeDate(3, '17:30'),
    },
    {
      id: '4',
      title: 'ヒアルロン酸注入',
      start: makeDate(4, '10:30'),
      end: makeDate(4, '11:30'),
    },
    {
      id: '5',
      title: '定期フォローアップ',
      start: makeDate(5, '18:00'),
      end: makeDate(5, '19:00'),
    },
  ];
};

const ReservationCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const events = useMemo(() => createWeekEvents(), []);

  const api = () => calendarRef.current?.getApi();

  const handleToday = () => api()?.today();
  const handlePrev = () => api()?.prev();
  const handleNext = () => api()?.next();

  const handleEventClick = (arg: EventClickArg) => {
    console.log('予約クリック:', {
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      extendedProps: arg.event.extendedProps,
    });
  };

  const handleEventDrop = (arg: EventDropArg) => {
    console.log('予約ドラッグ＆ドロップ:', {
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm md:p-6">
      {/* 外側ヘッダー（カスタムボタン） */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50/80 p-1 text-xs">
          <button
            type="button"
            onClick={handleToday}
            className="rounded-full px-3 py-1 font-semibold text-slate-700 transition-colors hover:bg-white hover:text-slate-900"
          >
            今日
          </button>
          <div className="mx-1 h-5 w-px self-center bg-slate-200" />
          <button
            type="button"
            onClick={handlePrev}
            className="rounded-full px-3 py-1 font-medium text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
          >
            前へ
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full px-3 py-1 font-medium text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
          >
            次へ
          </button>
        </div>
        <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
          WEEKLY SCHEDULE
        </div>
      </div>

      {/* FullCalendar 本体 */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/40">
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={false}
          height="auto"
          slotMinTime="10:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          nowIndicator={true}
          editable={true}
          droppable={true}
          selectable={false}
          events={events}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          viewClassNames="text-xs md:text-sm"
          dayHeaderClassNames="bg-white text-slate-500 font-semibold border-b border-slate-100"
          slotLabelClassNames="bg-white text-[11px] font-medium text-slate-400 border-r border-slate-100"
          dayCellClassNames="bg-slate-50/60 border-slate-100"
          nowIndicatorClassNames="border-sky-500"
          eventClassNames={() =>
            'bg-blue-500 border-0 rounded-md shadow-md text-[11px] leading-tight px-1.5 py-0.5 flex items-center'
          }
          eventTextColor="#ffffff"
          slotDuration="00:30:00"
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            meridiem: false,
          }}
          dayHeaderFormat={{
            weekday: 'short',
            month: 'numeric',
            day: 'numeric',
          }}
          locale="ja"
        />
      </div>
    </div>
  );
};

export default ReservationCalendar;

