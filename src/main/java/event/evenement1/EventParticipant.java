package event.evenement1;
import jakarta.xml.bind.annotation.XmlRootElement;
@XmlRootElement
public class EventParticipant {
    private String id;
    private Event event;
    private Users user;

    public EventParticipant(String id, Event event, Users user) {
        this.id = id;
        this.event = event;
        this.user = user;
    }

    // Getters et setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
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
