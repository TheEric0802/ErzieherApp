package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.Kind;
import casa.eric.erzieherapp.backend.repository.GruppeRepository;
import casa.eric.erzieherapp.backend.repository.KindRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class KindControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    KindRepository kindRepository;
    @Autowired
    GruppeRepository gruppeRepository;

    @Test
    void getAllKinder() throws Exception {
        gruppeRepository.save(new Gruppe("GID1", "Gruppe1"));
        kindRepository.save(new Kind("ID1", "Vorname1", "Nachname1", new Gruppe("GID1", "Gruppe1")));
        mockMvc.perform(get("/api/kind")).andExpect(status().isOk())
                .andExpect(content().json("""
                [
                    {"id": "ID1", "firstName": "Vorname1", "lastName": "Nachname1", "gruppe": {"id": "GID1", "name": "Gruppe1"}}
                ]
                """));
    }

    @Test
    @WithMockUser
    void createKind() throws Exception {
        mockMvc.perform(post("/api/kind")
                .contentType("application/json")
                .content("""
                {"firstName": "Vorname2", "lastName": "Nachname2", "gruppe": {"id": "GID2", "name": "Gruppe2"}}
                """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                    {"firstName": "Vorname2", "lastName": "Nachname2", "gruppe": {"id": "GID2", "name": "Gruppe2"}}
                """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @WithMockUser
    void updateKind() throws Exception {
        kindRepository.save(new Kind("ID2", "Vorname2", "Nachname2", new Gruppe("GID2", "Gruppe2")));
        mockMvc.perform(put("/api/kind/ID2")
                .contentType("application/json")
                .content("""
                {"firstName": "VornameUpdated", "lastName": "NachnameUpdated", "gruppe": {"id": "GID2", "name": "Gruppe2"}}
                """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {"id": "ID2", "firstName": "VornameUpdated", "lastName": "NachnameUpdated", "gruppe": {"id": "GID2", "name": "Gruppe2"}}
                """));
    }

    @Test
    @WithMockUser
    void deleteKind() throws Exception {
        kindRepository.save(new Kind("ID3", "Vorname3", "Nachname3", new Gruppe("GID3", "Gruppe3")));
        mockMvc.perform(delete("/api/kind/ID3")).andExpect(status().isNoContent());
    }
}