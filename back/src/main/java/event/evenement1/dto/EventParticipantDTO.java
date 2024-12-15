package event.evenement1.dto;

import event.evenement1.model.Users;

public class EventParticipantDTO {
    private Long id;
    private Users user;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }


}
