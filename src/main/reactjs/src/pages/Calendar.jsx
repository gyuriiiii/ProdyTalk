import React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarService from '../service/CalendarService';
import moment from 'moment';
import DetailModal from '../components/calendar/DetailModal'
import Modal from '../components/calendar/Modal'
import './css/calendar.css'



function Calender(props) {

    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const[calId, setCalId] = useState(0);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    // DetailModal용
    // open인 경우만 Modal 열림
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const openDetailModal = () => {
        setDetailModalOpen(true); // detail modal open
    };

    const closeDetailModal = () => {
        setDetailModalOpen(false); // detail modal close
    };

    // Modal에서 add 버튼 클릭 시 실행
    const addModal = (content, startDate, endDate, color) => {
        CalendarService.addEvent(content, startDate, endDate, color, props.roomId); // events에 전달받은 이벤트 추가해주기
        setModalOpen(false); // Modal 닫아주기
    };

    // DetailModal에서 수정 버튼 클릭 시 실행
    const editEvent = (editTitle, startDate, endDate, color) => {
        CalendarService.editEvent(calId, editTitle, startDate, endDate, color); // events에 수정할 calId, title 전달
        setDetailModalOpen(false); // Modal 닫아주기
    };

    // DetailModal에서 삭제 버튼 클릭 시 실행
    const deleteEvent = () => {
        console.log(calId);
        console.log('를 삭제');

        CalendarService.deleteEvent(calId); // 삭제할 event id 전달
        setDetailModalOpen(false); // Modal 닫아주기
    };

    useEffect(()=> {
        CalendarService.getCalendar(props.roomId).then((res) => {
            setEvents(res.data)
        })
    }, [events]);

  return (
    <div className="Calendar">

          <Modal open={modalOpen} close={closeModal} propFunction={addModal} header="일정을 입력해주세요." />
            <DetailModal open={detailModalOpen} close={closeDetailModal} propFunction={editEvent} propFunction2={deleteEvent} header="Event 수정/삭제" />

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth" // 기본 : 월 달력
                headerToolbar={{ // 월, 주, 일 버튼 클릭 시 달력 보기 변경
                    center: 'dayGridMonth,timeGridWeek,timeGridDay new',
                }}

                displayEventTime={false}

                customButtons = {{
                new : {
                    text : "new",

                    click : function() {
                        openModal();
                    }
                    }
                }}
        events={events} // event 전달


        eventColor="gray"
        nowIndicator
        // dateClick={(e) => console.log(e.dateStr)}
        // eventClick={(e) => console.log(e.event.id)}

        dateClick={ (e) => openModal() }

        eventClick={ (e) => {
            // events 배열에서 선택한 event
            var temp = events.find(function(data){ return (data.title==e.event.title)&&(data.start==moment(e.event.startStr).format("YYYY-MM-DD HH:mm:ss"))});

            const calId = temp.calendar_id // 선택한 event의 calendar_id
            setCalId(calId)

            openDetailModal()
          }
        }

      />
    </div>
  ); // return 끝
}

export default Calender