package event.evenement1.model;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.xml.bind.annotation.XmlRootElement;
@XmlRootElement
public class EventParticipant {
    private Long id;
    private Event event;
    private Users user;

    public EventParticipant(Long id, Event event, Users user) {
        this.id = id;
        this.event = event;
        this.user = user;
    }
    public EventParticipant() {}
   
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
