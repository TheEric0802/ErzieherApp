package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.GruppeDTO;
import casa.eric.erzieherapp.backend.repository.GruppeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class GruppeService {

    private final GruppeRepository gruppeRepository;
    private final IdService idService;

    public List<Gruppe> getAllGruppen() {
        return gruppeRepository.findAll();
    }

    public Gruppe createGruppe(GruppeDTO gruppe) {
        return gruppeRepository.save(new Gruppe(idService.generateId(), gruppe.name()));
    }

    public Gruppe updateGruppe(String id, GruppeDTO gruppe) {
        Gruppe updatedGruppe = gruppeRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Gruppe not found"))
                .withName(gruppe.name());
        return gruppeRepository.save(updatedGruppe);
    }

    public void deleteGruppe(String id) {
        if (!gruppeRepository.existsById(id)) {
            throw new NoSuchElementException("Gruppe not found");
        }
        gruppeRepository.deleteById(id);
    }
}
