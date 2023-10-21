package com.example.organizationms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    public Organization addOrganization(Organization org) {
        return organizationRepository.save(org);
    }

    public List<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }

    public Organization getOrganizationById(Long id) {
        return organizationRepository.findById(id).orElse(null);
    }

    public Organization createOrganization(Organization organization) {
        return organizationRepository.save(organization);
    }

    public void updateOrganization(Long id, Organization organization) {
        if (organizationRepository.existsById(id)) {
            organization.setId(id);
            organizationRepository.save(organization);
        }
    }

    public void deleteOrganization(Long id) {
        organizationRepository.deleteById(id);
    }

    public void archiveOrganization(Long id, Organization organization) {
        if (organizationRepository.existsById(id)) {
            organization.setArchived(true);
            organizationRepository.save(organization);
        }
    }
}
