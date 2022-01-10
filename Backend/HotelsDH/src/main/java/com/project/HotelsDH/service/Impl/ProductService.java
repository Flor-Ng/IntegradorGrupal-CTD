package com.project.HotelsDH.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.HotelsDH.model.Booking;
import com.project.HotelsDH.model.Image;
import com.project.HotelsDH.model.Product;
import com.project.HotelsDH.model.dto.BookingDTO;
import com.project.HotelsDH.model.dto.ImageDTO;
import com.project.HotelsDH.model.dto.ProductDTO;
import com.project.HotelsDH.repository.IProductRepository;
import com.project.HotelsDH.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService implements IProductService {

    @Autowired
    IProductRepository productRepository;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    BookingService bookingService;

    public void createProduct(ProductDTO productDTO) {

        Product product = mapper.convertValue(productDTO, Product.class);
        Set<Image> images = new HashSet<>();
        for (ImageDTO imageDTO: productDTO.getImages()) {
            images.add(mapper.convertValue(imageDTO, Image.class));
        }
        product.setImages(images);
        productRepository.save(product);
    }

    public ProductDTO readProduct(Long id) {

        ProductDTO productDTO = null;
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            productDTO = mapper.convertValue(product, ProductDTO.class);
            Set<ImageDTO> images = new HashSet<>();
            for (Image image: product.get().getImages()) {
                images.add(mapper.convertValue(image, ImageDTO.class));
            }
            productDTO.setImages(images);
        }
        return productDTO;
    }

    public void updateProduct(ProductDTO productDTO) {
        Product product = mapper.convertValue(productDTO, Product.class);
        productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Collection<ProductDTO> findAllByCityName(String name) {
        Collection<Product> cities = productRepository.findAllByCityName(name);
        Set<ProductDTO> productDTOS = new HashSet<>();
        for (Product product : cities) {
            ProductDTO finalProduct = mapper.convertValue(product, ProductDTO.class);
            Set<ImageDTO> imagesDTO = new HashSet<>();
            for (Image image: product.getImages()) {
                imagesDTO.add(mapper.convertValue(image, ImageDTO.class));
            }
            finalProduct.setImages(imagesDTO);
            productDTOS.add(finalProduct);
        }
        return productDTOS;
    }

    @Override
    public Collection<ProductDTO> findAllByCategoriesTitle(String title) {
        Collection<Product> categories = productRepository.findAllByCategoriesTitle(title);
        Set<ProductDTO> productDTOS = new HashSet<>();
        for (Product product : categories) {
            ProductDTO finalProduct = mapper.convertValue(product, ProductDTO.class);
            Set<ImageDTO> imagesDTO = new HashSet<>();
            for (Image image: product.getImages()) {
                imagesDTO.add(mapper.convertValue(image, ImageDTO.class));
            }
            finalProduct.setImages(imagesDTO);
            productDTOS.add(finalProduct);
        }
        return productDTOS;
    }

    public Collection<ProductDTO> getAll() {

        List<Product> products = productRepository.findAll();

        Set<ProductDTO> productDTOS = new HashSet<>();
        for (Product product : products) {
            ProductDTO finalProduct = mapper.convertValue(product, ProductDTO.class);
            Set<ImageDTO> imagesDTO = new HashSet<>();
            for (Image image: product.getImages()) {
                imagesDTO.add(mapper.convertValue(image, ImageDTO.class));
            }
            finalProduct.setImages(imagesDTO);
            productDTOS.add(finalProduct);
        }
        return productDTOS;
    }

    /**
     * Metodo que permite filtrar productos disponibles por rango de fechas.
     * */

    public Collection <ProductDTO> findByDate(LocalDate wantedDateIn, LocalDate wantedDateOut){
        Collection <BookingDTO> bookings = bookingService.findByDate(wantedDateIn, wantedDateOut);

        Set<Product> products = new HashSet<>();
        for (BookingDTO bookingDTO : bookings){
            products.add(bookingDTO.getProduct());
        }

        List<Product> productsBook = productRepository.findAll();

        for (Product product: products) {
            productsBook.removeIf(productBook->productBook.getId()==product.getId());
        }

        return productsBook.stream().map(product -> mapper.convertValue(product,ProductDTO.class)).collect(Collectors.toList());
    }

    /**
     * Metodo que permite filtrar productos por rango de fechas disponibles y ciudad.
     * */

    public Collection<ProductDTO> findByCityAndDate(LocalDate wantedDateIn, LocalDate wantedDateOut, String name){

        Collection<ProductDTO> productDTOSByCity = this.findAllByCityName(name);

        Collection<BookingDTO> bookingDTOSByDate = bookingService.findByDate(wantedDateIn, wantedDateOut);
        for (BookingDTO bookingDTO : bookingDTOSByDate) {
            productDTOSByCity.removeIf(product -> product.getId()==bookingDTO.getProduct().getId());
        }
        return productDTOSByCity;
    }
}