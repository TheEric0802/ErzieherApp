package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.GruppeDTO;
import casa.eric.erzieherapp.backend.service.GruppeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gruppe")
@AllArgsConstructor
public class GruppeController {

    private final GruppeService gruppeService;

    @GetMapping
    public List<Gruppe> getAllGruppen() {
        return gruppeService.getAllGruppen();
    }

    @PostMapping
    public Gruppe createGruppe(GruppeDTO gruppe) {
        return gruppeService.createGruppe(gruppe);
    }
}
