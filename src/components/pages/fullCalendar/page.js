"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar, Sparkles } from "lucide-react";
import { useUserTemplate } from "@/context/UserTemplateContext";
import ViewModal from "./ViewModal/page";

const FullCalendarPage = () => {
  const { templateFetchData, templateLoading, templateError } = useUserTemplate();
  const [templates, setTemplates] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const fetchTemplateHistory = async () => {
      try {
        // First, try to get all history in one request
        let result = await templateFetchData(`/templates/history/my?page=1&limit=100`);
        
        if (result && result.status === 200 && result.data) {
          let allHistoryData = result.data.history || [];
          const pagination = result.data.pagination;
          
          // If there are more pages, fetch them
          if (pagination && pagination.totalPages > 1) {
            
            for (let page = 2; page <= pagination.totalPages; page++) {
              const nextResult = await templateFetchData(`/templates/history/my?page=${page}&limit=100`);
              if (nextResult && nextResult.status === 200 && nextResult.data) {
                allHistoryData = [...allHistoryData, ...(nextResult.data.history || [])];
              }
            }
          }
          
          setTemplates(allHistoryData);
          
          // Convert history entries to calendar events
          const calendarEvents = allHistoryData.map(historyItem => {
            const template = historyItem.templateId;
            const action = historyItem.action;
            
            // Different colors based on action type
            let backgroundColor, borderColor, textColor;
            switch (action) {
              case 'viewed':
                backgroundColor = '#D2B48C'; // Light beige
                borderColor = '#D2B48C';
                textColor = '#2F2F2F';
                break;
              case 'bookmarked':
                backgroundColor = '#8B4513'; // Dark brown
                borderColor = '#8B4513';
                textColor = '#F5F5DC';
                break;
              case 'edited':
                backgroundColor = '#A0522D'; // Medium brown
                borderColor = '#A0522D';
                textColor = '#F5F5DC';
                break;
              default:
                backgroundColor = '#D2B48C';
                borderColor = '#D2B48C';
                textColor = '#2F2F2F';
            }
            
            return {
              id: `${historyItem._id}-${action}`,
              title: `${template.title} (${action})`,
              start: historyItem.createdAt,
              end: historyItem.createdAt, // Single point in time
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              textColor: textColor,
              extendedProps: {
                template: template,
                historyItem: historyItem,
                action: action
              }
            };
          });
          
          setEvents(calendarEvents);
         
        }
      } catch (error) {
        console.error("Error fetching template history:", error);
      }
    };
    fetchTemplateHistory();
  }, [templateFetchData]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
    // Remove body class when modal closes
    document.body.classList.remove('modal-open');
  };

  const handleEventClick = (clickInfo) => {
    const template = clickInfo.event.extendedProps.template;
    const historyItem = clickInfo.event.extendedProps.historyItem;
    const action = clickInfo.event.extendedProps.action;
    
    // Store template with history information
    const templateWithHistory = {
      ...template,
      historyItem: historyItem,
      action: action
    };
    
    setSelectedTemplate(templateWithHistory);
    setIsModalOpen(true);
    // Add body class to hide calendar popovers when modal is open
    document.body.classList.add('modal-open');
  };



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container-width fade-in px-2 sm:px-4 lg:px-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex items-center align-middle mb-4">
        <div className="bg-brand-beige p-2 sm:p-3 rounded-xl">
          <Calendar size={20} className="sm:w-6 sm:h-6" />
        </div>
                 <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold ml-3 heading-primary">Template History Calendar</h1>
      </div>

      {/* Welcome/Intro Card */}
      <div className="bg-brand-beige p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white p-2 sm:p-3 rounded-xl flex-shrink-0">
          <Sparkles className="text-brand-warm-brown w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
                     <h2 className="text-lg sm:text-xl lg:text-2xl font-bold heading-primary mb-1">Your Template Activity Timeline</h2>
           <p className="body-text text-brand-warm-brown text-sm sm:text-base">Track your template interactions - views, bookmarks, and edits over time. Click on any event to view template details.</p>
        </div>
      </div>

             {/* Stats Card */}
       <div className="bg-brand-soft-beige p-3 sm:p-4 rounded-xl mb-4 sm:mb-6">
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
           <div>
             <h3 className="heading-secondary text-brand-charcoal text-base sm:text-lg">Template History: {templates.length}</h3>
             <p className="body-text text-brand-warm-brown text-sm sm:text-base">
               {templates.length > 0 
                 ? `Showing ${templates.length} template interactions in calendar view`
                 : "No template history to display"
               }
             </p>
           </div>
           <div className="flex items-center gap-3 sm:gap-2">
             <div className="flex items-center gap-1">
               <div className="w-3 h-3 rounded-full bg-brand-warm-brown"></div>
               <span className="text-xs sm:text-sm text-brand-warm-brown">Bookmarked</span>
             </div>
             <div className="flex items-center gap-1">
               <div className="w-3 h-3 rounded-full bg-brand-beige"></div>
               <span className="text-xs sm:text-sm text-brand-warm-brown">Viewed</span>
             </div>
             <div className="flex items-center gap-1">
               <div className="w-3 h-3 rounded-full bg-brand-charcoal"></div>
               <span className="text-xs sm:text-sm text-brand-warm-brown">Edited</span>
             </div>
           </div>
         </div>
       </div>

      {/* Calendar Container */}
      <div className="bg-brand-beige p-3 sm:p-4 lg:p-6 rounded-xl shadow-sm">
        {templateLoading ? (
          <div className="flex justify-center items-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-4 border-b-4 border-brand-warm-brown"></div>
          </div>
        ) : templateError ? (
          <div className="text-center py-8 sm:py-12 font-poppins text-red-600 text-sm sm:text-base">{templateError}</div>
        ) : (
          <div className="calendar-container overflow-x-auto">
            <div className="min-w-full max-w-full">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next',
                  center: 'title',
                  right: isMobile ? '' : 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                footerToolbar={isMobile ? {
                  center: 'today dayGridMonth'
                } : undefined}
                initialView="dayGridMonth"
                editable={false}
                selectable={true}
                selectMirror={true}
                                 dayMaxEvents={isMobile ? 5 : 10}
                weekends={true}
                events={events}
                eventClick={handleEventClick}
                height={isMobile ? 350 : "auto"}
                eventDisplay="block"
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  meridiem: 'short'
                }}
                slotMinTime="00:00:00"
                slotMaxTime="24:00:00"
                allDaySlot={false}
                slotDuration="01:00:00"
                slotLabelFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  meridiem: 'short'
                }}
                eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
                dayHeaderFormat={{
                  weekday: isMobile ? 'narrow' : 'short',
                  day: 'numeric'
                }}
                titleFormat={{
                  year: 'numeric',
                  month: isMobile ? 'short' : 'long'
                }}
                buttonText={{
                  today: 'Today',
                  month: 'Month',
                  week: 'Week',
                  day: 'Day'
                }}
                aspectRatio={isMobile ? 1 : 1.35}
                eventContent={(eventInfo) => {
                  return (
                    <div className="fc-event-main-frame">
                      <div className="fc-event-title-container">
                        <div className="fc-event-title fc-sticky text-xs truncate px-1">
                          {eventInfo.event.title}
                        </div>
                      </div>
                    </div>
                  );
                }}
                                 moreLinkClick={false}
                 dayPopoverFormat={{
                   month: 'long',
                   day: 'numeric',
                   year: 'numeric'
                 }}
                eventDidMount={(info) => {
                  // Ensure calendar events don't interfere with modal
                  if (isModalOpen) {
                    info.el.style.pointerEvents = 'none';
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>

             {/* Template View Modal */}
       {isModalOpen && selectedTemplate && (
         <ViewModal
           template={selectedTemplate}
           isOpen={isModalOpen}
           onClose={handleModalClose}
           historyItem={selectedTemplate.historyItem}
           action={selectedTemplate.action}
         />
       )}

      {/* Custom CSS for better mobile calendar styling and z-index fixes */}
      <style jsx global>{`
        /* Calendar Container */
        .calendar-container {
          position: relative;
          z-index: 1;
        }

        /* Modal should be above calendar */
        .fixed.inset-0.bg-black.bg-opacity-50 {
          z-index: 9999 !important;
        }

        /* Ensure calendar popover doesn't appear above modal */
        .fc-popover {
          z-index: 40 !important;
          max-width: 90vw !important;
          max-height: 80vh !important;
          overflow: auto !important;
        }

        /* Mobile popover fixes */
        @media (max-width: 767px) {
          .fc-popover {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 95vw !important;
            max-width: 350px !important;
            max-height: 70vh !important;
            margin: 0 !important;
            border-radius: 8px !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
          }

          .fc-popover-header {
            padding: 8px 12px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
          }

          .fc-popover-body {
            padding: 8px 12px !important;
            max-height: 60vh !important;
            overflow-y: auto !important;
          }

          .fc-popover-close {
            font-size: 16px !important;
            padding: 4px !important;
          }

          .fc-popover .fc-event {
            margin: 2px 0 !important;
            padding: 4px 6px !important;
            font-size: 12px !important;
            border-radius: 4px !important;
          }

          .fc-popover .fc-event-title {
            font-size: 11px !important;
            line-height: 1.3 !important;
          }

          .fc-popover .fc-event-time {
            font-size: 10px !important;
          }
        }

        /* Very small screens */
        @media (max-width: 480px) {
          .fc-popover {
            width: 98vw !important;
            max-width: 320px !important;
            max-height: 65vh !important;
          }

          .fc-popover-header {
            padding: 6px 10px !important;
            font-size: 13px !important;
          }

          .fc-popover-body {
            padding: 6px 10px !important;
            max-height: 55vh !important;
          }

          .fc-popover .fc-event {
            padding: 3px 5px !important;
            font-size: 11px !important;
          }

          .fc-popover .fc-event-title {
            font-size: 10px !important;
          }

          .fc-popover .fc-event-time {
            font-size: 9px !important;
          }
        }

        /* Mobile Styles */
        @media (max-width: 767px) {
          .fc-header-toolbar {
            flex-direction: column !important;
            gap: 8px !important;
            margin-bottom: 10px !important;
          }
          
          .fc-toolbar-chunk {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }
          
          .fc-button {
            font-size: 11px !important;
            padding: 4px 8px !important;
            margin: 0 2px !important;
          }
          
          .fc-toolbar-title {
            font-size: 14px !important;
            margin: 0 !important;
          }
          
          .fc-daygrid-event {
            font-size: 10px !important;
            margin: 1px 0 !important;
            padding: 1px 2px !important;
          }
          
          .fc-col-header-cell {
            padding: 2px 1px !important;
            font-size: 11px !important;
          }
          
          .fc-daygrid-day-number {
            font-size: 11px !important;
            padding: 2px !important;
          }
          
          .fc-event-title {
            font-size: 9px !important;
            line-height: 1.2 !important;
          }

          .fc-daygrid-day-frame {
            min-height: 35px !important;
          }

          .fc-day-today {
            background-color: rgba(139, 69, 19, 0.1) !important;
          }

          .fc-more-link {
            font-size: 9px !important;
            padding: 1px 3px !important;
          }
        }
        
        /* Very small screens */
        @media (max-width: 480px) {
          .fc-toolbar-title {
            font-size: 13px !important;
          }
          
          .fc-button {
            font-size: 10px !important;
            padding: 3px 6px !important;
          }
          
          .fc-daygrid-day-number {
            font-size: 10px !important;
          }

          .fc-col-header-cell {
            font-size: 10px !important;
          }

          .fc-daygrid-day-frame {
            min-height: 30px !important;
          }
        }

        /* Tablet styles */
        @media (min-width: 768px) and (max-width: 1023px) {
          .fc-toolbar {
            flex-direction: row !important;
          }
          
          .fc-button {
            font-size: 12px !important;
          }
          
          .fc-toolbar-title {
            font-size: 16px !important;
          }
        }

        /* Desktop styles */
        @media (min-width: 1024px) {
          .fc-button {
            font-size: 13px !important;
          }
          
          .fc-toolbar-title {
            font-size: 18px !important;
          }
        }

        /* Fix calendar button spacing */
        .fc .fc-button-group > .fc-button {
          margin: 0 1px;
        }

        /* Calendar event styling */
        .fc-event {
          border-radius: 3px !important;
          border: none !important;
          font-weight: 500 !important;
        }

        /* When modal is open, hide calendar popovers */
        body.modal-open .fc-popover {
          display: none !important;
        }

        /* Prevent horizontal scrolling on mobile */
        @media (max-width: 767px) {
          body {
            overflow-x: hidden !important;
          }
          
          .fc-view-harness {
            overflow-x: hidden !important;
          }
          
          .fc-scroller {
            overflow-x: hidden !important;
          }
          
          .fc-scroller-liquid {
            overflow-x: hidden !important;
          }
        }

        /* Ensure popover doesn't cause horizontal scroll */
        .fc-popover {
          box-sizing: border-box !important;
        }

                 /* Better touch targets for mobile */
         @media (max-width: 767px) {
           .fc-button {
             min-height: 32px !important;
             min-width: 32px !important;
           }
           
           .fc-event {
             min-height: 20px !important;
           }
         }


      `}</style>
    </div>
  );
};

export default FullCalendarPage;